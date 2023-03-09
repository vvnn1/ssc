package com.github.martvey.cli.entity.app;

import lombok.extern.slf4j.Slf4j;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;
import org.jline.terminal.Terminal;

import java.net.URI;
import java.util.Collections;
import java.util.concurrent.atomic.AtomicBoolean;

import static com.github.martvey.cli.entity.security.TokenHolder.SSC_TOKEN;
import static com.github.martvey.cli.entity.security.TokenHolder.TOKEN;

@Slf4j
public class DebugWebSocketClient extends WebSocketClient {

    private final Terminal terminal;
    private final AtomicBoolean isFinish;

    public DebugWebSocketClient(URI serverUri, Terminal terminal, AtomicBoolean isFinish) {
        super(serverUri, Collections.singletonMap(SSC_TOKEN, TOKEN));
        this.terminal = terminal;
        this.isFinish = isFinish;
    }

    @Override
    public void onOpen(ServerHandshake serverHandshake) {
        log.trace("调试开始...");
    }

    @Override
    public void onMessage(String message) {
        terminal.writer().print(message);
        terminal.flush();
    }

    @Override
    public void onClose(int code, String reason, boolean remote) {
        isFinish.compareAndSet(false, true);
    }

    @Override
    public void onError(Exception e) {
        isFinish.compareAndSet(false, true);
        log.error("服务端调试错误，uri：{}", uri, e);
    }
}
