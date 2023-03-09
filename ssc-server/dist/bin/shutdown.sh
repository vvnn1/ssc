#!/bin/bash
#author VVnnl
readonly BIN_PATH=`dirname $0`
readonly PID_FILES=(`ls $BIN_PATH | grep "SSC_SERVER_APP_MAIN"`)

. $BIN_PATH/basefunc.sh

for (( i = 0; i < ${#PID_FILES[@]}; i++ )); do
  stopServer "$BIN_PATH/${PID_FILES[$i]}"
done