package com.github.martvey.cli.net;

import com.github.lianjiatech.retrofit.spring.boot.core.RetrofitClient;
import com.github.martvey.cli.entity.project.ProjectDetail;
import com.github.martvey.cli.entity.project.ProjectTable;
import com.github.martvey.cli.entity.request.PProjectRequest;
import com.github.martvey.cli.entity.request.UProjectRequest;
import com.github.martvey.cli.retrofit.decoder.SscErrorDecoder;
import retrofit2.http.*;

import java.util.List;

@RetrofitClient(baseUrl = "http://${ssc.ip}:${ssc.port}", errorDecoder = SscErrorDecoder.class)
@SuppressWarnings("UnusedReturnValue")
public interface ProjectApi {
    @GET("/project/list")
    List<ProjectTable> listProject(@Query("spaceId") String spaceId);
    @GET("/project")
    ProjectDetail getProject(@Query("id") String id);
    @POST("/project")
    Void postProject(@Body PProjectRequest project);
    @DELETE("/project")
    Void deleteProject(@Query("id") String id);
    @PUT("/project")
    Void renameProject(@Body UProjectRequest request);
}
