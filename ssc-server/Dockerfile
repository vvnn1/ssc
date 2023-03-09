FROM registry.cn-hangzhou.aliyuncs.com/martvey/alpine-jre:1.8
MAINTAINER martvey <137418235@qq.com>
ADD ./target/ssc-server.tar.gz /opt/module/
VOLUME ["/opt/module/ssc-server/log", "/opt/module/ssc-server/config"]
ENTRYPOINT ["sh", "/opt/module/ssc-server/bin/startup.sh"]
EXPOSE 9704