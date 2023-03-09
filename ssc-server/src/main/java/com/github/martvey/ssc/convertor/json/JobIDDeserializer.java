package com.github.martvey.ssc.convertor.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.apache.flink.api.common.JobID;

import java.io.IOException;

public class JobIDDeserializer extends JsonDeserializer<JobID> {

    @Override
    public JobID deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        return JobID.fromHexString(p.getValueAsString());
    }
}
