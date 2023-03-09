package com.github.martvey.ssc.entity.metastore;

import com.github.martvey.ssc.constant.ScopeEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@ToString
public class ScopeQuery {
    private String flinkId = "0";
    private String systemId = "0";
    private String spaceId;
    private String projectId;
    private String appId;
    private List<ScopeEnum> scopeTypeList;

    private ScopeQuery() {
    }

    public static Builder builder(String spaceId, String projectId){
        return new Builder(spaceId, projectId);
    }

    public static Builder builder(String spaceId, String projectId, String appId){
        return new Builder(spaceId, projectId, appId);
    }

    public static Builder builder(){
        return new Builder(null, null);
    }

    public static class Builder{
        private String spaceId;
        private String projectId;
        private String appId;
        private List<ScopeEnum> scopeTypeList;

        public Builder(String spaceId, String projectId) {
            this.spaceId = spaceId;
            this.projectId = projectId;
        }

        public Builder(String spaceId, String projectId, String appId) {
            this.spaceId = spaceId;
            this.projectId = projectId;
            this.appId = appId;
        }

        public Builder spaceId(String spaceId){
            this.spaceId = spaceId;
            return this;
        }

        public Builder projectId(String projectId){
            this.projectId = projectId;
            return this;
        }

        public Builder appId(String appId){
            this.appId = appId;
            return this;
        }

        public Builder scopeTypeList(List<ScopeEnum> scopeTypeList) {
            this.scopeTypeList = scopeTypeList;
            return this;
        }

        public Builder scopeTypeList(ScopeEnum... scopeTypes){
            this.scopeTypeList = Arrays.asList(scopeTypes);
            return this;
        }

        public ScopeQuery build(){
            ScopeQuery scopeQuery = new ScopeQuery();
            scopeQuery.spaceId = this.spaceId;
            scopeQuery.projectId = this.projectId;
            scopeQuery.scopeTypeList = this.scopeTypeList;
            scopeQuery.appId = this.appId;
            return scopeQuery;
        }
    }
}
