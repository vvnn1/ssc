//package com.github.martvey.ssc.configuration;
//
//import com.github.martvey.ssc.security.filter.JwtAuthenticationTokenFilter;
//import com.github.martvey.ssc.security.handler.JwtAuthenticationSuccessHandler;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
////@Configuration
////@EnableWebSecurity
//public class SecurityConfiguration {
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
////    @Bean
////    public WebSecurityCustomizer webSecurityCustomizer() {
////        return (web) -> web.ignoring().antMatchers("/images/**", "/js/**", "/webjars/**");
////    }
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthenticationTokenFilter filter) throws Exception {
//        http.csrf().disable()
//                .sessionManagement().disable()
//                .formLogin()
//                .successHandler(new JwtAuthenticationSuccessHandler())
//                .and()
//                .authorizeRequests()
//                .antMatchers("/user/login").anonymous()
//                .anyRequest()
////                        .anonymous();
//                .authenticated();
//
//        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
//        return http.build();
//    }
//}