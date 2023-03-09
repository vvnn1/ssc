@ECHO OFF
SET BIN_PATH=%~dp0
if "%BIN_PATH:~-1%" == "\" (
  set BIN_PATH=%BIN_PATH:~0,-1%
)
SET SERVER_PATH="%BIN_PATH%"\..
SET SERVER_NAME=SSC_CLIENT_APP_MAIN
SET CLASS_PATH=%SERVER_PATH%\lib\*;%SERVER_PATH%\config\
SET MAIN_CLASS=com.github.martvey.cli.SscClientApp
SET INSTANCE_NAME=%SERVER_NAME%_DEFAULT
SET SERVER_CONFIG=-Dserver.path=%SERVER_PATH% -Dlogger.path=%SERVER_PATH%\log -Duser.dir=%SERVER_PATH%

java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -cp %CLASS_PATH% %SERVER_CONFIG% %MAIN_CLASS%