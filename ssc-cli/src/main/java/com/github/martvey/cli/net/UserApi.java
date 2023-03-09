package com.github.martvey.cli.net;

import com.github.lianjiatech.retrofit.spring.boot.core.RetrofitClient;
import com.github.martvey.cli.retrofit.decoder.SscErrorDecoder;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

@RetrofitClient(baseUrl = "http://${ssc.ip}:${ssc.port}/space", errorDecoder = SscErrorDecoder.class)
@SuppressWarnings("UnusedReturnValue")
public interface UserApi {
    @FormUrlEncoded
    @POST("/login")
    Void login(@Field("username") String username, @Field("password") String password);
}
