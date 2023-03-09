package com.github.martvey.ssc.security.filter;

import com.github.martvey.ssc.entity.common.SscErrorCode;
import com.github.martvey.ssc.constant.SscConstant;
import com.github.martvey.ssc.entity.security.LoginUser;
import com.github.martvey.ssc.exception.SscClientException;
import com.github.martvey.ssc.exception.SscServerException;
import com.github.martvey.ssc.service.UserService;
import com.github.martvey.ssc.util.JwtUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {
    private final UserService userService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader(SscConstant.SSC_TOKEN);
        if (!StringUtils.hasText(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        String userId;
        try {
            Claims claims = JwtUtils.parseJWT(token);
            userId = claims.getSubject();
        } catch (ExpiredJwtException e){
            throw new SscClientException(SscErrorCode.TOKEN_EXPIRE);
        } catch (Exception e) {
            throw new SscServerException(SscErrorCode.SYSTEM_ERROR);
        }

        UserDetails loginUser = userService.loadUserByUserId(Long.parseLong(userId));

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginUser, null, loginUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        filterChain.doFilter(request, response);

        if (JwtUtils.ttl(token, TimeUnit.MINUTES) < 5) {
            String newToken = JwtUtils.createJWT(userId, ((LoginUser) loginUser).userMap(), JwtUtils.JWT_TTL);
            response.addHeader(SscConstant.NEW_SSC_TOKEN, newToken);
        }
    }
}
