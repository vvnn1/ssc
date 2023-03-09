package com.github.martvey.ssc.convertor.handler;

import org.apache.flink.api.common.JobID;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class JobIDTypeHandler extends BaseTypeHandler<JobID> {
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, JobID parameter, JdbcType jdbcType) throws SQLException {
        ps.setString(i, parameter.toHexString());
    }

    @Override
    public JobID getNullableResult(ResultSet rs, String columnName) throws SQLException {
        String jobID = rs.getString(columnName);
        return jobID == null ? null : JobID.fromHexString(jobID);
    }

    @Override
    public JobID getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String jobID = rs.getString(columnIndex);
        return jobID == null ? null : JobID.fromHexString(jobID);
    }

    @Override
    public JobID getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String jobID = cs.getString(columnIndex);
        return jobID == null ? null : JobID.fromHexString(jobID);
    }
}
