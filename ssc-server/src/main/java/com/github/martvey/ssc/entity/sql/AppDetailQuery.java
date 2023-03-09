package com.github.martvey.ssc.entity.sql;

import com.github.martvey.ssc.constant.ScopeEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@ToString
public class AppDetailQuery {
    private String appId;
    private List<ScopeEnum> scopeTypeList;

    public AppDetailQuery() {
    }

    public static Builder builder(){
        return new AppDetailQuery.Builder();
    }

    public AppDetailQuery(String appId, List<ScopeEnum> scopeTypeList) {
        this.appId = appId;
        this.scopeTypeList = scopeTypeList;
    }

    public static class Builder{
        private String appId;
        private List<ScopeEnum> scopeTypeList;

        private Builder() {
        }

        public Builder appId(String appId){
            this.appId = appId;
            return this;
        }

        public Builder scopeTypeList(ScopeEnum ... scopeType){
            this.scopeTypeList = Arrays.asList(scopeType);
            return this;
        }

        public AppDetailQuery build(){
            return new AppDetailQuery(appId, scopeTypeList);
        }
    }
}
