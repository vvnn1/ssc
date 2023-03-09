package com.github.martvey.ssc.service.impl;

import com.github.martvey.ssc.dao.UserDao;
import com.github.martvey.ssc.entity.security.LoginUser;
import com.github.martvey.ssc.entity.security.User;
import com.github.martvey.ssc.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.getUserByName(username);
        if (user == null){
            throw new UsernameNotFoundException("用户" + username + "不存在");
        }
        return new LoginUser(user, Collections.emptyList());
    }

    @Override
    public UserDetails loadUserByUserId(Long userId) throws UsernameNotFoundException {
        User user = userDao.getUserById(userId);
        if (user == null){
            throw new UsernameNotFoundException("用户" + userId + "不存在");
        }
        return new LoginUser(user, Collections.emptyList());
    }
}
