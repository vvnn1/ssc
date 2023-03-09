package com.github.martvey.ssc.mapper.local;

import com.github.martvey.ssc.entity.security.User;
import org.apache.ibatis.annotations.Param;

public interface UserMapper {
    User getUserByName(@Param("name") String name);
    User getUserById(@Param("userId") Long userId);
}
