package com.github.martvey.ssc.security.handler;

import com.github.martvey.ssc.constant.SscConstant;
import com.github.martvey.ssc.entity.security.LoginUser;
import com.github.martvey.ssc.util.JwtUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        String userId = String.valueOf(loginUser.getUser().getId());
        String token = JwtUtils.createJWT(userId, loginUser.userMap(), JwtUtils.JWT_TTL);
        response.addHeader(SscConstant.NEW_SSC_TOKEN, token);
        response.setStatus(HttpServletResponse.SC_NO_CONTENT);
    }
}
