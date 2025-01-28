@echo off
title Git Commit Script

:: Prompt for the repository directory
set /p repo_dir=Enter the path to your Git repository (leave empty for current directory): 

:: Use current directory if no path is provided
if "%repo_dir%"=="" set repo_dir=%cd%

:: Change to the specified directory
cd /d "%repo_dir%"

:: Check if this is a Git repository
if not exist ".git" (
    echo This is not a Git repository.
    pause
    exit /b 1
)

:: Stage all changes
echo Staging all changes...
git add --all

:: Prompt for commit message
set /p commit_msg=Enter a commit message: 

:: Check if commit message is empty
if "%commit_msg%"=="" (
    echo Commit message cannot be empty.
    pause
    exit /b 1
)

:: Commit the changes
echo Committing changes...
git commit -m "%commit_msg%"
if %ERRORLEVEL% NEQ 0 (
    echo An error occurred while committing changes. Please check your Git configuration or resolve any issues.
    pause
    exit /b 1
)

echo Successfully committed changes!
pause
exit /b 0