package com.github.martvey.cli.shell.provider;

import com.github.martvey.cli.entity.event.ProvideChangeEvent;
import org.jline.utils.AttributedString;
import org.jline.utils.AttributedStringBuilder;
import org.jline.utils.AttributedStyle;
import org.springframework.context.event.EventListener;
import org.springframework.shell.jline.PromptProvider;
import org.springframework.stereotype.Component;

@Component
public class ConsumerProvider implements PromptProvider {
    public static final String NOT_LOGIN = "NOT_LOGIN";
    private String provideName = NOT_LOGIN;

    @Override
    public AttributedString getPrompt() {
        return new AttributedStringBuilder()
//                .style(AttributedStyle.DEFAULT.foreground(AttributedStyle.GREEN))
                .style(AttributedStyle.DEFAULT)
                .append(String.format("%s@ssc", "wangml"))
                .style(AttributedStyle.DEFAULT)
                .append(":> ")
                .toAttributedString();
    }

    @EventListener
    public void updateProvideName(ProvideChangeEvent event) {
        provideName = ((String) event.getSource());
    }
}
