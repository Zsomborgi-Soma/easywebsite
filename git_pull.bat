@echo off
title Git Pull Script

REM Check if we're in a Git repository
if not exist ".git" (
    echo This is not a Git repository.
    pause
    exit /b 1
)

REM Pull the latest changes from the remote repository
echo Pulling the latest changes from the remote repository...
git pull origin main

REM Check if the pull was successful
if errorlevel 1 (
    echo An error occurred while pulling changes. Please check your Git configuration or resolve any conflicts.
    pause
    exit /b 1
)

echo Successfully pulled the latest changes from the remote repository!
pause