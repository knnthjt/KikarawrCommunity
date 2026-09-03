@echo off
title Kikarawr Community Web Server

:: Ensure working directory is this project folder
cd /d "%~dp0"

echo ====================================================
echo        KIKARAWR COMMUNITY LOCAL WEB SERVER
echo ====================================================
echo.

:: Detect PHP executable
set "PHP_CMD=php"
where php >nul 2>nul
if %errorlevel% neq 0 (
    if exist "%LOCALAPPDATA%\Microsoft\WinGet\Packages\PHP.PHP.8.2_Microsoft.Winget.Source_8wekyb3d8bbwe\php.exe" (
        set "PHP_CMD=%LOCALAPPDATA%\Microsoft\WinGet\Packages\PHP.PHP.8.2_Microsoft.Winget.Source_8wekyb3d8bbwe\php.exe"
    )
)

echo Starting PHP development server at http://localhost:8000 ...
echo Press Ctrl + C in this window anytime to stop the server.
echo.

:: Launch default browser
start http://localhost:8000

:: Run PHP server
"%PHP_CMD%" -S 127.0.0.1:8000

pause
