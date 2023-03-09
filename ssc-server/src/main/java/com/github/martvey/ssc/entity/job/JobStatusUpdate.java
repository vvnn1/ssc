package com.github.martvey.ssc.entity.job;

import com.github.martvey.ssc.constant.JobStatusEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.flink.api.common.JobID;
import org.apache.flink.configuration.Configuration;

@Getter
@Setter
@ToString
public class JobStatusUpdate {
    private String id;
    private JobID jobID;
    private JobStatusEnum jobStatus;
    private Configuration configuration;
    private String restAddress;

    public static Builder builder(){
        return new Builder();
    }

    public static Builder builder(JobDetail jobDetail){
        return new Builder()
                .id(jobDetail.getId())
                .configuration(jobDetail.getSourceConfiguration());
    }

    public static class Builder{
        private String id;
        private JobID jobID;
        private JobStatusEnum jobStatus;
        private Configuration configuration;
        private String restAddress;

        public Builder id(String id){
            this.id = id;
            return this;
        }

        public Builder jodID(JobID jobID){
            this.jobID = jobID;
            return this;
        }

        public Builder jobStatus(JobStatusEnum jobStatus){
            this.jobStatus = jobStatus;
            return this;
        }

        public Builder configuration(Configuration configuration){
            this.configuration = configuration;
            return this;
        }

        public Builder restAddress(String restAddress){
            this.restAddress = restAddress;
            return this;
        }

        public JobStatusUpdate build(){
            JobStatusUpdate update = new JobStatusUpdate();
            update.id = id;
            update.jobID = jobID;
            update.jobStatus = jobStatus;
            update.configuration = configuration;
            update.restAddress = restAddress;
            return update;
        }
    }
}
