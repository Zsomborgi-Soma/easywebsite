@echo off

REM Check if we're in a Git repository
if not exist ".git" (
    echo This is not a Git repository.
    exit /b 1
)

REM Check if a commit message is provided
if "%~1"=="" (
    echo Please provide a commit message.
    exit /b 1
)

REM Add all changes to the staging area
git add .

REM Commit with the provided message
git commit -m "%~1"

REM Push the changes to the remote repository (optional)
git push origin main

echo Changes committed and pushed successfully!