@echo off
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set ANDROID_SDK_ROOT=C:\Users\MH.Rezaiy_110\AppData\Local\Android\Sdk
set ANDROID_HOME=C:\Users\MH.Rezaiy_110\AppData\Local\Android\Sdk
set GRADLE_HOME=C:\Users\MH.Rezaiy_110\.gradle\wrapper\dists\gradle-8.2.1-all\d8pvvlun5bx6sdtwqhf8y9z4b\gradle-8.2.1
set PATH=%JAVA_HOME%\bin;%GRADLE_HOME%\bin;%PATH%

REM Use 8.3 short path to avoid Persian character issues
set ANDROID_DIR=C:\Users\MHD512~1.REZ\Desktop\B11C~1\android

echo JAVA_HOME=%JAVA_HOME%
echo ANDROID_DIR=%ANDROID_DIR%
echo.

echo Checking Java...
"%JAVA_HOME%\bin\java.exe" -version
echo.

echo Running Gradle assembleDebug...
cd /d "%ANDROID_DIR%"
echo Current dir: %CD%
echo.

"%GRADLE_HOME%\bin\gradle.bat" assembleDebug --no-daemon

echo.
echo Exit code: %ERRORLEVEL%
