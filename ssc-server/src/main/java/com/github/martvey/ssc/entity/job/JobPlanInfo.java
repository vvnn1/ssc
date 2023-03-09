package com.github.martvey.ssc.entity.job;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.util.Objects;

/**
 * @author martvey
 * @date 2022/6/25 18:13
 */
@JsonSerialize(
        using = JobPlanInfo.Serializer.class
)
@JsonDeserialize(
        using = JobPlanInfo.Deserializer.class
)
public class JobPlanInfo {
    private final String json;

    public JobPlanInfo(String json) {
        this.json = json;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        } else if (o != null && this.getClass() == o.getClass()) {
            JobPlanInfo rawJson = (JobPlanInfo)o;
            return Objects.equals(this.json, rawJson.json);
        } else {
            return false;
        }
    }

    public int hashCode() {
        return Objects.hash(this.json);
    }

    public String toString() {
        return "RawJson{json='" + this.json + '\'' + '}';
    }

    public static final class Deserializer extends StdDeserializer<JobPlanInfo> {
        private static final long serialVersionUID = -3580088509877177213L;

        public Deserializer() {
            super(JobPlanInfo.class);
        }

        public JobPlanInfo deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
            JsonNode rootNode = jsonParser.readValueAsTree();
            return new JobPlanInfo(rootNode.toString());
        }
    }

    public static final class Serializer extends StdSerializer<JobPlanInfo> {
        private static final long serialVersionUID = -1551666039618928811L;

        public Serializer() {
            super(JobPlanInfo.class);
        }

        public void serialize(JobPlanInfo jobPlanInfo, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
            jsonGenerator.writeRawValue(jobPlanInfo.json);
        }
    }
}
