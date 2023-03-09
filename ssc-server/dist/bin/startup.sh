#!/bin/bash
#author VVnnl
readonly BIN_PATH=`dirname "$0"`
readonly SERVER_PATH=`cd "$BIN_PATH"/..; pwd`
readonly SERVER_NAME="SSC_SERVER_APP_MAIN"
readonly CLASS_PATH=${SERVER_PATH}/lib/*:${SERVER_PATH}/config/
readonly MAIN_CLASS=com.github.martvey.ssc.SscServerAppMain
export HADOOP_USER_NAME=ssc
. $BIN_PATH/basefunc.sh
INSTANCE_NAME="${SERVER_NAME}_DEFAULT"
SERVER_CONFIG="-Dserver.path=${SERVER_PATH}\
          -Dlogger.path=${SERVER_PATH}/log"
startServer "$SERVER_CONFIG" $INSTANCE_NAME