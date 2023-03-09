package com.github.martvey.cli.net;

import com.github.lianjiatech.retrofit.spring.boot.core.RetrofitClient;
import com.github.martvey.cli.entity.request.PVersionRequest;
import com.github.martvey.cli.entity.version.VersionTable;
import com.github.martvey.cli.retrofit.decoder.SscErrorDecoder;
import retrofit2.http.*;

import java.util.List;

@RetrofitClient(baseUrl = "http://${ssc.ip}:${ssc.port}", errorDecoder = SscErrorDecoder.class)
@SuppressWarnings("UnusedReturnValue")
public interface VersionApi {
    @GET("/version/list")
    List<VersionTable> listVersion(@Query("appId") String appId);
    @POST("/version")
    VersionTable createVersion(@Body PVersionRequest request);
    @DELETE("/version")
    Void dropVersion(@Query("id") String id);
}
