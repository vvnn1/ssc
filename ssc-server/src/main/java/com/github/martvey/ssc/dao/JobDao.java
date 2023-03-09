package com.github.martvey.ssc.dao;


import com.github.martvey.ssc.exception.DaoException;
import com.github.martvey.ssc.entity.job.JobDetail;
import com.github.martvey.ssc.entity.job.JobInsert;
import com.github.martvey.ssc.entity.job.JobStatusUpdate;
import com.github.martvey.ssc.entity.job.JobVO;

import java.util.List;

public interface JobDao {
    void insertJob(JobInsert insert) throws DaoException;

    JobDetail getJobDetail(String id) throws DaoException;

    void updateJobStatus(JobStatusUpdate update) throws DaoException;

    boolean hasVersionJob(String versionId) throws DaoException;

    void deleteJob(String id) throws DaoException;

    List<JobVO> listJob() throws DaoException;
}
