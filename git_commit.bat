@echo off
title Git Commit Script

REM Ask for the repository directory
set /p repo_dir=Enter the path to your Git repository (leave empty for current directory): 

REM Use current directory if no path is provided
if "%repo_dir%"=="" set repo_dir=%cd%

REM Change to the repository directory
cd /d "%repo_dir%"

REM Check if we're in a Git repository
if not exist ".git" (
    echo This is not a Git repository.
    pause
    exit /b 1
)

REM Stage all changes
echo Staging all changes...
git add --all

REM Ask for a commit message
set /p commit_msg=Enter a commit message: 

REM Check if commit message is empty
if "%commit_msg%"=="" (
    echo Commit message cannot be empty.
    pause
    exit /b 1
)

REM Commit the changes
echo Committing changes...
git commit -m "%commit_msg%"

REM Check if the commit was successful
if errorlevel 1 (
    echo An error occurred while committing changes. Please check your Git configuration or resolve any issues.
    pause
    exit /b 1
)

echo Successfully committed changes with message: "%commit_msg%"
pause
