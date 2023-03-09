package com.github.martvey.ssc.mapper.local;

import com.github.martvey.ssc.entity.job.JobDetail;
import com.github.martvey.ssc.entity.job.JobInsert;
import com.github.martvey.ssc.entity.job.JobStatusUpdate;
import com.github.martvey.ssc.entity.job.JobVO;

import java.util.List;

public interface JobMapper {
    void insertJob(JobInsert insert);

    JobDetail getJobDetail(String id);

    void updateJobStatus(JobStatusUpdate update);

    int hasVersionJob(String versionId);

    void deleteJob(String id);

    List<JobVO> listJob();
}
