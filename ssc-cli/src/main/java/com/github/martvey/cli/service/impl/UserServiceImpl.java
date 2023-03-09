package com.github.martvey.cli.service.impl;

import com.github.martvey.cli.net.UserApi;
import com.github.martvey.cli.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserApi userApi;
    @Override
    public void login(String username, String password) {
        userApi.login(username, password);
    }
}
