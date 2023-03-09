package com.github.martvey.ssc.service;


import com.github.martvey.ssc.entity.job.*;

import java.util.List;

public interface JobService {
    void createJob(JobInsert insert);
    JobDetail getJobDetail(String id);
    void updateJobStatus(JobStatusUpdate update);
    void deleteJob(String id);
    List<JobVO> listJob();

    void jobRun(String id);
    void jobStop(String id);
    void jobCancel(String id);

    JobPlanInfo getJobPlanInfo(String id);
}
