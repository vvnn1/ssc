function runServer() {
    SERVER_CONFIG=$1
    INSTANCE_NAME=$2
    PID_FILE=$3
    > $PID_FILE
    echo "java -cp $CLASS_PATH $SERVER_CONFIG $MAIN_CLASS"
    java -cp $CLASS_PATH $SERVER_CONFIG $MAIN_CLASS
#    java -cp $CLASS_PATH $SERVER_CONFIG $MAIN_CLASS 1>>/dev/null 2>>/dev/null &
#    if [ 0 -eq $? ]; then
#        PID=$!
#        echo $PID > $PID_FILE
#        echo "${INSTANCE_NAME}启动成功"
#    else
#        echo "ERROR：${INSTANCE_NAME}启动失败"
#    fi
}

function startServer() {
    SERVER_CONFIG=$1
    INSTANCE_NAME=$2
    PID_FILE="${BIN_PATH}/${INSTANCE_NAME}.pid"
    if [ ! -f ${PID_FILE} ]; then
        runServer "${SERVER_CONFIG}" ${INSTANCE_NAME} ${PID_FILE}
    else
        PID=`cat ${PID_FILE}`
        if [ -z $PID ]; then
            runServer "${SERVER_CONFIG}" $INSTANCE_NAME $PID_FILE
        else
            if [ 0 -eq `ps -ef| grep $PID | grep -v "grep" | wc -l` ]; then
                runServer "${SERVER_CONFIG}" ${INSTANCE_NAME} ${PID_FILE}
            else
                echo "ERROR：${INSTANCE_NAME}已经在运行"
            fi
        fi
    fi
}

function stopServer() {
    PID_FILE=$1
    PID=`cat $PID_FILE`
    INSTANCE_NAME=`basename ./${PID_FILE} .pid`
    if [ -z $PID ]||[ 0 -eq `ps -ef| grep $PID | grep -v "grep" | wc -l` ]; then
        rm -f $PID_FILE
        continue
    fi
    kill -9 $PID
    if [ 0 -eq $? ]; then
      echo "${INSTANCE_NAME} 关闭成功"
      rm -f $PID_FILE
    else
      echo "ERROR：${INSTANCE_NAME} 关闭失败，请手动关闭"
    fi
}