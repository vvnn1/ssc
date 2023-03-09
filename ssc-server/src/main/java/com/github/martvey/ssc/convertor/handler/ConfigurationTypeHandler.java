package com.github.martvey.ssc.convertor.handler;


import com.github.martvey.ssc.util.FlinkConfigurationUtil;
import org.apache.flink.configuration.Configuration;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ConfigurationTypeHandler extends BaseTypeHandler<Configuration> {
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, Configuration configuration, JdbcType jdbcType) throws SQLException {
        String yml = FlinkConfigurationUtil.toYml(configuration);
        ps.setString(i, yml);
    }

    @Override
    public Configuration getNullableResult(ResultSet rs, String columnName) throws SQLException {
        String yml = rs.getString(columnName);
        return FlinkConfigurationUtil.loadYAMLResource(yml);
    }

    @Override
    public Configuration getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String yml = rs.getString(columnIndex);
        return FlinkConfigurationUtil.loadYAMLResource(yml);
    }

    @Override
    public Configuration getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String yml = cs.getString(columnIndex);
        return FlinkConfigurationUtil.loadYAMLResource(yml);
    }
}
