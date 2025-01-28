# Ensure we are in a Git repository
if (-Not (Test-Path ".git")) {
    Write-Host "This is not a Git repository."
    exit 1
}

# Check if commit message is provided
if ($args.Length -eq 0) {
    Write-Host "Please provide a commit message."
    exit 1
}

# Add all changes (you can customize this to specific files if you prefer)
git add .

# Commit with the provided commit message
git commit -m $args[0]

# Push to the remote repository (optional)
git push origin main

Write-Host "Changes committed and pushed successfully!"
