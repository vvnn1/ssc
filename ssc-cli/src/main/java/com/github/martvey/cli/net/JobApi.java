package com.github.martvey.cli.net;

import com.github.lianjiatech.retrofit.spring.boot.core.RetrofitClient;
import com.github.martvey.cli.entity.job.JobTable;
import com.github.martvey.cli.entity.job.PJobRequest;
import com.github.martvey.cli.entity.plan.Plan;
import com.github.martvey.cli.entity.request.USqlJobRequest;
import com.github.martvey.cli.retrofit.decoder.SscErrorDecoder;
import retrofit2.http.*;

import java.util.List;

@RetrofitClient(baseUrl = "http://${ssc.ip}:${ssc.port}", errorDecoder = SscErrorDecoder.class)
@SuppressWarnings("UnusedReturnValue")
public interface JobApi {
    @GET("/job/list")
    List<JobTable> listJob();
    @POST("/job")
    Void createJob(@Body PJobRequest request);
    @DELETE("/job")
    Void dropJob(@Query("id") String id);
    @PUT("/job/run")
    Void runJob(@Body USqlJobRequest id);
    @PUT("/job/stop")
    Void stopJob(@Body USqlJobRequest id);
    @PUT("/job/re-run")
    Void reRunJob(@Body USqlJobRequest id);
    @GET("/job/plan")
    Plan getJobPlan(@Query("id") String id);
}
