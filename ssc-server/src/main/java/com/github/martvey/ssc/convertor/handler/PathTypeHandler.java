package com.github.martvey.ssc.convertor.handler;

import org.apache.flink.core.fs.Path;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PathTypeHandler extends BaseTypeHandler<Path> {
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, Path parameter, JdbcType jdbcType) throws SQLException {
        ps.setString(i, parameter.toString());
    }

    @Override
    public Path getNullableResult(ResultSet rs, String columnName) throws SQLException {
        String path = rs.getString(columnName);
        return new Path(path);
    }

    @Override
    public Path getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String path = rs.getString(columnIndex);
        return new Path(path);
    }

    @Override
    public Path getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String path = cs.getString(columnIndex);
        return new Path(path);
    }
}
