package com.github.martvey.cli.entity.event;

import org.springframework.context.ApplicationEvent;

public class ProvideChangeEvent extends ApplicationEvent {
    /**
     * Create a new ApplicationEvent.
     *
     * @param source the object on which the event initially occurred (never {@code null})
     */
    public ProvideChangeEvent(Object source) {
        super(source);
    }
}
