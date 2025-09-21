@echo off

if "%~1"=="" (
    echo No arguments supplied
    goto :eof
)

for %%a in (%*) do (
    mkdir "ex%%a"
)