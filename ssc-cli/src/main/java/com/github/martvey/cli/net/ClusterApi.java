package com.github.martvey.cli.net;

import com.github.lianjiatech.retrofit.spring.boot.core.RetrofitClient;
import com.github.martvey.cli.entity.cluster.ClusterTable;
import com.github.martvey.cli.entity.request.PClusterRequest;
import com.github.martvey.cli.entity.request.PClusterRunRequest;
import com.github.martvey.cli.retrofit.decoder.SscErrorDecoder;
import retrofit2.http.*;

import java.util.List;

/**
 * @author martvey
 * @date 2022/5/24 14:04
 */
@RetrofitClient(baseUrl = "http://${ssc.ip}:${ssc.port}", errorDecoder = SscErrorDecoder.class)
@SuppressWarnings("UnusedReturnValue")
public interface ClusterApi {
    @POST("/cluster")
    Void createCluster(@Body PClusterRequest request);
    @POST("/cluster/run")
    Void runCluster(@Body PClusterRunRequest request);
    @DELETE("/cluster/cancel")
    Void cancelCluster(@Query("id") String id);
    @DELETE("/cluster")
    Void deleteCluster(@Query("id") String id);
    @GET("/cluster/list")
    List<ClusterTable> listCluster();
}
