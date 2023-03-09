package com.github.martvey.ssc.dao.impl;

import com.github.martvey.ssc.dao.UserDao;
import com.github.martvey.ssc.entity.security.User;
import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.mapper.local.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserDaoImpl implements UserDao {
    private final UserMapper userMapper;

    @Override
    public User getUserByName(String userName) {
        try {
            return userMapper.getUserByName(userName);
        }catch (Exception e){
            throw new DaoException("数据库查询用户错误");
        }
    }

    @Override
    public User getUserById(Long userId) {
        try {
            return userMapper.getUserById(userId);
        }catch (Exception e){
            throw new DaoException("数据库查询用户错误");
        }
    }
}
