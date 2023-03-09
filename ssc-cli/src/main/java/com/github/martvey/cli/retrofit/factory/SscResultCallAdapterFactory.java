package com.github.martvey.cli.retrofit.factory;

import com.github.lianjiatech.retrofit.spring.boot.exception.RetrofitException;
import com.github.martvey.cli.entity.common.SscResult;
import okhttp3.Request;
import org.springframework.stereotype.Component;
import retrofit2.Call;
import retrofit2.CallAdapter;
import retrofit2.Response;
import retrofit2.Retrofit;
import sun.reflect.generics.reflectiveObjects.ParameterizedTypeImpl;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;

@Component
public class SscResultCallAdapterFactory extends CallAdapter.Factory{
    @Override
    public CallAdapter<?, ?> get(Type returnType, Annotation[] annotations, Retrofit retrofit) {
        if (Call.class.isAssignableFrom(getRawType(returnType))) {
            return null;
        }
        if (CompletableFuture.class.isAssignableFrom(getRawType(returnType))) {
            return null;
        }
        if (Response.class.isAssignableFrom(getRawType(returnType))) {
            return null;
        }
        return new SscResultCallAdapter<>(returnType);
    }

    static final class SscResultCallAdapter<R> implements CallAdapter<SscResult<R>, R>{
        private final Type returnType;

        public SscResultCallAdapter(Type returnType) {
            this.returnType = returnType;
        }

        @Override
        public Type responseType() {
            return ParameterizedTypeImpl.make(SscResult.class, new Type[]{returnType}, null);
        }

        @Override
        public R adapt(Call<SscResult<R>> call) {
            Response<SscResult<R>> response;
            Request request = call.request();
            try {
                response = call.execute();
            } catch (IOException e) {
                throw Objects.requireNonNull(RetrofitException.errorExecuting(request, e));
            }

            SscResult<R> sscResult = response.body();
            return sscResult == null ? null : sscResult.getContent();
        }
    }
}