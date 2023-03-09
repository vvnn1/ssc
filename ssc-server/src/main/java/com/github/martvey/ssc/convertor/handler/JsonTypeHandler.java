package com.github.martvey.ssc.convertor.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.martvey.ssc.entity.job.JobPlanInfo;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.springframework.util.ObjectUtils;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author martvey
 * @date 2022/7/12 11:35
 */
public class JsonTypeHandler extends BaseTypeHandler<JobPlanInfo> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, JobPlanInfo parameter, JdbcType jdbcType) throws SQLException {
        try {
            ps.setString(i, objectMapper.writeValueAsString(parameter));
        }catch (Exception e){
            throw new SQLException(e);
        }
    }

    @Override
    public JobPlanInfo getNullableResult(ResultSet rs, String columnName) throws SQLException {
        return parseJobPlan(rs.getString(columnName));
    }

    @Override
    public JobPlanInfo getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        return parseJobPlan(rs.getString(columnIndex));
    }

    @Override
    public JobPlanInfo getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        return parseJobPlan(cs.getString(columnIndex));
    }

    private JobPlanInfo parseJobPlan(String jobPlan) throws SQLException{
        if (ObjectUtils.isEmpty(jobPlan)){
            return null;
        }
        try {
            return objectMapper.readValue(jobPlan, JobPlanInfo.class);
        } catch (IOException e) {
            throw new SQLException(e);
        }
    }
}
