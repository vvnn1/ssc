package com.github.martvey.core.cli;

import java.net.URL;
import java.util.Properties;

public class CliOptions {
    private final URL environment;
    private final URL defaults;
    private final String updateLocation;
    private final Properties dynamicProperties;

    public CliOptions(URL environment, URL defaults
            , String updateLocation
            , Properties dynamicProperties) {
        this.environment = environment;
        this.defaults = defaults;
        this.updateLocation = updateLocation;
        this.dynamicProperties = dynamicProperties;
    }

    public URL getEnvironment() {
        return environment;
    }

    public URL getDefaults() {
        return defaults;
    }

    public String getUpdateLocation() {
        return updateLocation;
    }

    public Properties getDynamicProperties() {
        return dynamicProperties;
    }
}
