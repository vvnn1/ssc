package com.github.martvey.ssc.convertor.handler;

import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.springframework.util.ObjectUtils;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class ListTypeHandler extends BaseTypeHandler<List<String>> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, List<String> parameter, JdbcType jdbcType) throws SQLException {
        ps.setString(i, String.join(",", parameter));
    }

    @Override
    public List<String> getNullableResult(ResultSet rs, String columnName) throws SQLException {
        String jars = rs.getString(columnName);
        if (ObjectUtils.isEmpty(jars)){
            return Collections.emptyList();
        }
        return splitStr(jars);
    }

    @Override
    public List<String> getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String jars = rs.getString(columnIndex);
        if (ObjectUtils.isEmpty(jars)){
            return Collections.emptyList();
        }
        return splitStr(jars);
    }

    @Override
    public List<String> getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String jars = cs.getString(columnIndex);
        if (ObjectUtils.isEmpty(jars)){
            return Collections.emptyList();
        }
        return splitStr(jars);
    }

    private List<String> splitStr(String jars){
        return Arrays.asList(jars.split(","));
    }
}
