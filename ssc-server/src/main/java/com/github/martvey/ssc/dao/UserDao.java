package com.github.martvey.ssc.dao;

import com.github.martvey.ssc.entity.security.User;

public interface UserDao {
    User getUserByName(String userName);
    User getUserById(Long userId);
}
