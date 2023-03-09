package com.github.martvey.cli.net;

import com.github.lianjiatech.retrofit.spring.boot.core.RetrofitClient;
import com.github.martvey.cli.constant.MetastoreEnum;
import com.github.martvey.cli.entity.metastore.MetastoreTable;
import com.github.martvey.cli.entity.request.PMetastoreReuqest;
import com.github.martvey.cli.entity.request.UMetastoreRequest;
import com.github.martvey.cli.retrofit.decoder.SscErrorDecoder;
import retrofit2.http.*;

import java.util.List;

@RetrofitClient(baseUrl = "http://${ssc.ip}:${ssc.port}", errorDecoder = SscErrorDecoder.class)
@SuppressWarnings("UnusedReturnValue")
public interface MetastoreApi {
    @POST("/metastore")
    Void createMetastore(@Body PMetastoreReuqest function);
    @GET("/metastore/list")
    List<MetastoreTable> listMetastore(@Query("metastoreType")MetastoreEnum metastoreType,
                                       @Query("spaceId") String spaceId,
                                       @Query("projectId") String projectId,
                                       @Query("appId") String appId);
    @DELETE("/metastore")
    Void deleteMetastore(@Query("metastoreType") MetastoreEnum metastoreType, @Query("id") String id);

    @GET("/metastore")
    MetastoreTable getMetastore(@Query("metastoreType") MetastoreEnum metastoreType, @Query("id") String id);

    @PUT("/metastore")
    Void updateMetastore(@Body UMetastoreRequest uMetastoreRequest);
}
