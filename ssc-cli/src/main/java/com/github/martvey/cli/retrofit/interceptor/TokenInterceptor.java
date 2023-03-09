package com.github.martvey.cli.retrofit.interceptor;

import com.github.lianjiatech.retrofit.spring.boot.interceptor.GlobalInterceptor;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import java.io.IOException;

import static com.github.martvey.cli.entity.security.TokenHolder.*;

@Component
public class TokenInterceptor implements GlobalInterceptor {
    @NonNull
    @Override
    public Response intercept(@NonNull Chain chain) throws IOException {
        Request request = chain.request();
        if (!ObjectUtils.isEmpty(TOKEN)) {
            request = request.newBuilder()
                    .addHeader(SSC_TOKEN, TOKEN)
                    .build();
        }
        Response response = chain.proceed(request);
        String newToken = response.header(NEW_SSC_TOKEN);
        if (!ObjectUtils.isEmpty(newToken)) {
            TOKEN = newToken;
        }
        return response;
    }
}
