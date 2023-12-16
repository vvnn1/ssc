package com.github.martvey.ssc.entity.result.indicator;

public interface ResultIndicator {
    void displayStreamResults();
    void displayBatchResults();
    boolean isDisplayRunning();
}
