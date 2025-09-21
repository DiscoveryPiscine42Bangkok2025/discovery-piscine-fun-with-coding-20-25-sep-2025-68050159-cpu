@echo off

if "%1"=="" (
    echo No arguments supplied
) else (
    if not "%1"=="" echo %1
    if not "%2"=="" echo %2
    if not "%3"=="" echo %3
)