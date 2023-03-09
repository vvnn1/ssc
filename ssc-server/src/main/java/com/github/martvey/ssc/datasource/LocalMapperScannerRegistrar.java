package com.github.martvey.ssc.datasource;

public class LocalMapperScannerRegistrar extends AbstractMapperScannerRegistrar{
    @Override
    String getAnnotationName() {
        return EnableLocalDataSource.class.getName();
    }
}
