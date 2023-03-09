package com.github.martvey.cli.net;

import com.github.lianjiatech.retrofit.spring.boot.core.RetrofitClient;
import com.github.martvey.cli.entity.app.AppDetail;
import com.github.martvey.cli.entity.app.AppTable;
import com.github.martvey.cli.entity.app.AppValidResultTable;
import com.github.martvey.cli.entity.request.PAppRequest;
import com.github.martvey.cli.entity.request.UAppRequest;
import com.github.martvey.cli.retrofit.decoder.SscErrorDecoder;
import retrofit2.http.*;

import java.util.List;

@RetrofitClient(baseUrl = "http://${ssc.ip}:${ssc.port}", errorDecoder = SscErrorDecoder.class)
@SuppressWarnings("UnusedReturnValue")
public interface AppApi {
    @GET("/app/list")
    List<AppTable> listApp(@Query("projectId") String projectId);

    @POST("/app")
    Void createApp(@Body PAppRequest appRequest);

    @PUT("/app")
    Void updateApp(@Body UAppRequest appRequest);

    @GET("/app")
    AppDetail getApp(@Query("id") String id);

    @GET("/app/validate")
    AppValidResultTable validateApp(@Query("id") String id);

    @DELETE("/app")
    Void deleteApp(@Query("id") String id);
}
