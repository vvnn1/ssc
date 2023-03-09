package com.github.martvey.ssc.entity.debug;

import lombok.extern.slf4j.Slf4j;

import javax.websocket.Session;
import java.io.IOException;
import java.io.Writer;

@Slf4j
public class CmdOutputWriter extends Writer {
    private final Session session;

    public CmdOutputWriter(Session session) {
        this.session = session;
        lock = session;
    }

    public void write(int c) throws IOException {
        sendText(String.valueOf(c));
    }

    public void write(char cbuf[], int off, int len) throws IOException {
        if ((off < 0) || (off > cbuf.length) || (len < 0) ||
                ((off + len) > cbuf.length) || ((off + len) < 0)) {
            throw new IndexOutOfBoundsException();
        } else if (len == 0) {
            return;
        }
        sendText(String.copyValueOf(cbuf,off,len));
    }

    public void write(String str) throws IOException {
        sendText(str);
    }

    public void write(String str, int off, int len) throws IOException {
        sendText(str.substring(off, off + len));
    }

    public CmdOutputWriter append(CharSequence csq) throws IOException {
        if (csq == null)
            write("null");
        else
            write(csq.toString());
        return this;
    }

    public CmdOutputWriter append(CharSequence csq, int start, int end) throws IOException {
        CharSequence cs = (csq == null ? "null" : csq);
        write(cs.subSequence(start, end).toString());
        return this;
    }

    public CmdOutputWriter append(char c) throws IOException {
        write(c);
        return this;
    }

    public void flush() {
    }

    public void close() throws IOException {
    }

    private void sendText(String text) throws IOException {
        if (session.isOpen()){
            session.getBasicRemote().sendText(text);
        } else {
            log.warn("session异常关闭， 无法发送的内容：{}", text);
        }
    }
}
