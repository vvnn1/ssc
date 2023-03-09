package com.github.martvey.ssc.entity.security;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class LoginUser implements UserDetails {

    private User user;

    private List<SimpleGrantedAuthority> grantedAuthorityList;

    public LoginUser() {
    }

    public LoginUser(User user, List<String> authorityList) {
        this.user = user;
        if (CollectionUtils.isEmpty(authorityList)){
            this.grantedAuthorityList = Collections.emptyList();
        } else {
            this.grantedAuthorityList = authorityList.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUserName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Map<String, Object> userMap(){
        return new HashMap<>();
    }
}
