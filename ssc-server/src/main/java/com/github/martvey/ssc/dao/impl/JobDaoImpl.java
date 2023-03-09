package com.github.martvey.ssc.dao.impl;


import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.dao.JobDao;
import com.github.martvey.ssc.entity.job.JobDetail;
import com.github.martvey.ssc.entity.job.JobInsert;
import com.github.martvey.ssc.entity.job.JobStatusUpdate;
import com.github.martvey.ssc.entity.job.JobVO;
import com.github.martvey.ssc.mapper.local.JobMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class JobDaoImpl implements JobDao {
    private final JobMapper jobMapper;

    @Override
    public void insertJob(JobInsert insert) throws DaoException {
        try {
            jobMapper.insertJob(insert);
        }catch (Exception e){
            throw new DaoException("数据库插入job错误",e);
        }
    }

    @Override
    public JobDetail getJobDetail(String id) throws DaoException {
        try {
            return jobMapper.getJobDetail(id);
        }catch (Exception e){
            throw new DaoException("数据库查询job详情错误",e);
        }
    }

    @Override
    public void updateJobStatus(JobStatusUpdate update) throws DaoException {
        try {
            jobMapper.updateJobStatus(update);
        }catch (Exception e){
            throw new DaoException("数据库更新job错误",e);
        }
    }

    @Override
    public boolean hasVersionJob(String versionId) throws DaoException {
        try {
            return jobMapper.hasVersionJob(versionId) > 0;
        }catch (Exception e){
            throw new DaoException("数据库查询job版本错误",e);
        }
    }

    @Override
    public void deleteJob(String id) throws DaoException {
        try {
            jobMapper.deleteJob(id);
        }catch (Exception e){
            throw new DaoException("数据库删除job错误",e);
        }
    }

    @Override
    public List<JobVO> listJob() throws DaoException {
        try {
            return jobMapper.listJob();
        }catch (Exception e){
            throw new DaoException("数据库查询job错误",e);
        }
    }
}
