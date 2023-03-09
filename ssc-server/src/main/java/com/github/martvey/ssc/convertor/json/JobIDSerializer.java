package com.github.martvey.ssc.convertor.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.apache.flink.api.common.JobID;

import java.io.IOException;

public class JobIDSerializer extends JsonSerializer<JobID> {
    @Override
    public void serialize(JobID value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeString(value.toHexString());
    }
}
