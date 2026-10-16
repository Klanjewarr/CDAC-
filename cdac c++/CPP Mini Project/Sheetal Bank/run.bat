@echo off
title Banking & Transaction Management System
color 0B
echo ============================================================
echo      BANKING & TRANSACTION MANAGEMENT SYSTEM (C++)
echo ============================================================
echo.
echo [1/2] Compiling banking_system.cpp with g++ (C++11)...
g++ -std=c++11 -Wall banking_system.cpp -o banking_system.exe
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Compilation failed! Please check if MinGW g++ is installed.
    pause
    exit /b %ERRORLEVEL%
)

echo [2/2] Launching application...
echo.
banking_system.exe

pause
