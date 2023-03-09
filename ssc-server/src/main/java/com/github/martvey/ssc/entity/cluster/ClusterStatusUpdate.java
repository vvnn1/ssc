package com.github.martvey.ssc.entity.cluster;

import com.github.martvey.ssc.constant.ClusterStatusEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.configuration.Configuration;

@Getter
@Setter
@ToString
public class ClusterStatusUpdate {
    private String id;
    private String applicationId;
    private ClusterStatusEnum clusterStatus;
    private String url;
    private Configuration configuration;

    public static Builder builder(){
        return new Builder();
    }

    public static class Builder{
        private String id;
        private String applicationId;
        private ClusterStatusEnum clusterStatus;
        private String url;
        private Configuration configuration;

        public Builder id(String id){
            this.id = id;
            return this;
        }

        public Builder applicationId(String applicationId){
            this.applicationId = applicationId;
            return this;
        }

        public Builder clusterStatus(ClusterStatusEnum clusterStatus){
            this.clusterStatus = clusterStatus;
            return this;
        }

        public Builder url(String url){
            this.url = url;
            return this;
        }

        public Builder configuration(Configuration configuration){
            this.configuration = configuration;
            return this;
        }

        public ClusterStatusUpdate build(){
            ClusterStatusUpdate update = new ClusterStatusUpdate();
            update.id = id;
            update.applicationId = applicationId;
            update.clusterStatus = clusterStatus;
            update.url = url;
            update.configuration = configuration;
            return update;
        }
    }
}
