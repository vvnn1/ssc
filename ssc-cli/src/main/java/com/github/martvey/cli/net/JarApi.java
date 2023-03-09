package com.github.martvey.cli.net;

import com.github.lianjiatech.retrofit.spring.boot.core.RetrofitClient;
import com.github.martvey.cli.entity.jar.JarTable;
import com.github.martvey.cli.retrofit.decoder.SscErrorDecoder;
import okhttp3.RequestBody;
import retrofit2.http.*;

import java.util.List;

@RetrofitClient(baseUrl = "http://${ssc.ip}:${ssc.port}", errorDecoder = SscErrorDecoder.class)
@SuppressWarnings("UnusedReturnValue")
public interface JarApi {
    @POST("/jar")
    Void uploadJar(@Body RequestBody requestBody);
    @GET("/jar/list")
    List<JarTable> listJar(@Query("spaceId") String spaceId, @Query("projectId") String projectId, @Query("appId") String appId);
    @DELETE("/jar")
    Void deleteJar(@Query("id") String id);
}
