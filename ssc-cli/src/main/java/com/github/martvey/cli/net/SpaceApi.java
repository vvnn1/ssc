package com.github.martvey.cli.net;


import com.github.lianjiatech.retrofit.spring.boot.core.RetrofitClient;
import com.github.martvey.cli.entity.request.PSpaceRequest;
import com.github.martvey.cli.entity.request.USpaceRequest;
import com.github.martvey.cli.entity.space.SpaceDetail;
import com.github.martvey.cli.entity.space.SpaceTable;
import com.github.martvey.cli.retrofit.decoder.SscErrorDecoder;
import retrofit2.http.*;

import java.util.List;

@RetrofitClient(baseUrl = "http://${ssc.ip}:${ssc.port}", errorDecoder = SscErrorDecoder.class)
@SuppressWarnings("UnusedReturnValue")
public interface SpaceApi {
    @POST("/space")
    Void createSpace(@Body PSpaceRequest request);
    @DELETE("/space")
    Void deleteSpace(@Query("id") String id);
    @GET("/space/list")
    List<SpaceTable> listSpace();
    @GET("/space")
    SpaceDetail getSpace(@Query("id") String id);
    @PUT("/space")
    Void renameSpace(@Body USpaceRequest request);
}
