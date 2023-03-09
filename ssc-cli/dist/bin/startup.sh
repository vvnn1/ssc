#!/bin/bash
#author VVnnl
readonly BIN_PATH=`dirname "$0"`
readonly SERVER_PATH=`cd "$BIN_PATH"/..; pwd`
readonly CLASS_PATH=${SERVER_PATH}/lib/*:${SERVER_PATH}/config/
readonly MAIN_CLASS=com.github.martvey.cli.SscClientApp
readonly SERVER_CONFIG="-Dserver.path=${SERVER_PATH}\
          -Dlogger.path=${SERVER_PATH}/log\
          -Duser.dir=${SERVER_PATH}"


java -cp "$CLASS_PATH" "$SERVER_CONFIG" $MAIN_CLASS