---
title: How to separate a subproject within a Github Repo
tags:
  - Tech
  - Blog
  - Script
  - Git
---
## Pain Point
You may have times that many projects are developed under the same repository and all the project source code got piled up in one giant repo. Some of the projects are archive already and replaced by their own repository for isolation. However, the archived source code are still left in the giant repo and constantly firing security vulnerabilities which requires dev's maintenance effort on it.

## Naive Solution (no commit history)
An intuitive way of doing so is to remove the files in the `SOURCE_REPO` and add the files in the `TARGET_REPO`. However, in this way, you will need to find the commit history from the `SOURCE_REPO` and it is a very messy process. We need a better way of doing so.

## Automated Solution (with commit history)
I have created a bash script that can help you smoothly migrate some projects out from one repo to another, with the commit histories reserved. It utilize the below technology/tools/technologies:
1. git subtree
2. bash

### Idea
The approach is heavily based on the command `git subtree` that extract a part of the code base from the `SOURCE_REPO` (with commit history) into a separate branch. It can then be used as the content needs to be migrated to the new location.
1. Get the subtree
	1. **[Step 1]** To get the most up-to-date subtree, you need to make sure the `SOURCE REPO` you are using is always up-to-date with its origin (**main**)
	2. **[Step 2]** Create the subtree
2. Prepare the target repo
	2. **[Step 3]** Clone the target repo to a chosen location, fetch the most up-to-date changes (as someone else might be migrating the projects and it needs to be captured)
	2. **[Step 4]** Prepare the `TARGET_REPO` structure
		1. All the files within the *project to be migrated* branch will be fetched to the top-level
		2. These files need to be moved to a specific folder for easier look up process. So a `projects` prefix been made and it will be added as an expected item when moving files accordingly.
3. **[Step 5]** All the changes are local till this moment. To protect the commit history and be save, a Pull Request is heavily recommended for both **Source Repo** and the **Target Repo**
3. **[Step 6]** Remove the project been migrated from the **Source Repo**
3. **[Step 7]** Similar to **Step 5**, a PR is enforced to make changes to the `main/origin`

### Code
`archive_projects.sh`:
```bash
#!/bin/bash

# Bash script to split a project directory from a large Git repository into a separate repository, preserving the original folder structure within a new directory.

# Exit immediately if a command exits with a non-zero status.
set -e

#### Argument Validation
if [ "$#" -ne 5 ]; then
    echo "Usage: $0 <PROJECT_PATH> <ORIGINAL_REPO_PATH> <NEW_REPO_SSH_URL> <SOURCE_BRANCH> <TARGET_REPO_CLONE_PATH>"
    exit 1
fi

#### Variables
PROJECT_PATH="$1"
# The name of the last folder in the project path
PROJECT_FOLDER_NAME=$(basename "$PROJECT_PATH")
ORIGINAL_REPO_PATH="$2"
NEW_REPO_SSH_URL="$3"
SOURCE_BRANCH="$4"
TARGET_REPO_CLONE_PATH="$5"      
# Full path where subtree will be pulled
PROJECT_PATH_IN_TARGET="${TARGET_REPO_CLONE_PATH}/${PROJECT_FOLDER_NAME}" 
# Branch details for source and target repositories
NEW_REMOTE_NAME="target-origin"
SPLIT_BRANCH="${PROJECT_FOLDER_NAME}-only"
TARGET_BRANCH="legacy-migration-${PROJECT_FOLDER_NAME}"
TARGET_PREFIX="projects"

#### Process
echo "Starting the split process..."

# Step 1: Clone and update the source repository
echo "[Step 1] Navigating to the original repository at '$ORIGINAL_REPO_PATH'..."
cd "$ORIGINAL_REPO_PATH" || { echo "Original repository path not found."; exit 1; }

# Ensure there are no uncommitted changes in the source repository
if [[ -n $(git status --porcelain) ]]; then
    echo "[Step 1] Uncommitted changes detected in the source repository. Please commit or stash them before proceeding."
    exit 1
fi

echo "[Step 1] Fetching all updates from remotes..."
git fetch --all

# Check if the branch exists locally
if git rev-parse --verify "$SOURCE_BRANCH" >/dev/null 2>&1; then
    echo "Branch '$SOURCE_BRANCH' exists locally. Checking it out."
    git checkout "$SOURCE_BRANCH"
elif git ls-remote --exit-code --heads origin "$SOURCE_BRANCH" >/dev/null 2>&1; then
    echo "Branch '$SOURCE_BRANCH' exists on remote. Checking it out."
    git checkout -t "origin/$SOURCE_BRANCH"
else
    echo "Branch '$SOURCE_BRANCH' does not exist. Creating it from 'origin/main'."
    git checkout -b "$SOURCE_BRANCH" origin/main
    git push -u origin "$SOURCE_BRANCH"
fi

# Ensure branch is up to date with origin
echo "[Step 1] Merging any changes from 'origin/main' into '$SOURCE_BRANCH'..."
git merge "origin/main" || {
    echo "Automatic fast-forward merge failed. Please merge manually."
    exit 1
}

# Check for merge conflicts in the source branch
if [[ $(git ls-files -u | wc -l) -gt 0 ]]; then
    echo "Merge conflicts detected. Please resolve them before proceeding."
    exit 1
fi

# Step 2: Split the project directory into its own branch in the source repository
echo "[Step 2] Creating a new branch '$SPLIT_BRANCH' with only the '$PROJECT_PATH' directory..."
git subtree split --prefix="$PROJECT_PATH" -b "$SPLIT_BRANCH"
# git subtree split --prefix="test_repo_seperation/project2_to_move" -b "project2_to_move-only"

# Step 3: Clone the target repository to the specified path
echo "[Step 3] Cloning the target repository to '$TARGET_REPO_CLONE_PATH'..."

# Remove the temp folder if it is already exist:
if [ -d "$TARGET_REPO_CLONE_PATH" ]; then
    rm -rf "$TARGET_REPO_CLONE_PATH"
    echo "[Step 3] Deleted the existing $TARGET_REPO_CLONE_PATH for new cloning..."
fi

git clone "$NEW_REPO_SSH_URL" "$TARGET_REPO_CLONE_PATH"
cd "$TARGET_REPO_CLONE_PATH"

# Pull the project from the split branch in the source repository
echo "[Step 3] Merging the project files from '$SPLIT_BRANCH' into '$TARGET_REPO_CLONE_PATH'..."
git remote add source "$ORIGINAL_REPO_PATH"
git fetch source
git merge source/"$SPLIT_BRANCH" --allow-unrelated-histories

# Step 4: Organize the project files into a folder
echo "[Step 4] Organizing the fetched project files into '$PROJECT_FOLDER_NAME'..."

# If the PREFIX folder has not been created 
if [ ! -d "$TARGET_PREFIX" ]; then
    echo "[Step 4] '$TARGET_PREFIX' doesn't exist, creating it for the first time"
    mkdir "$TARGET_PREFIX"
fi
# Add the prefix and save all the files within a prefixed place
PROJECT_FOLDER_NAME="$TARGET_PREFIX/$PROJECT_FOLDER_NAME"

mkdir -p "$PROJECT_FOLDER_NAME"
# Move all top-level files to the newly created folder
for file in $(git ls-tree --name-only HEAD); do
    if [ "$file" != "$PROJECT_FOLDER_NAME" ] && [ "$file" != "$TARGET_PREFIX" ]; then
        git mv "$file" "$PROJECT_FOLDER_NAME/"
    fi
done

# Commit the reorganization
echo "[Step 4] Committing the reorganization of files into '$PROJECT_FOLDER_NAME' folder..."
git add .
git commit -m "Organize $PROJECT_FOLDER_NAME with preserved commit history"
git push origin HEAD:"$TARGET_BRANCH"

# Step 5: Provide instructions for creating a pull request
echo "[Step 5] Branch '$TARGET_BRANCH' with organized structure pushed to '$NEW_REPO_SSH_URL'."
echo "[Step 5] TODO: (REQUIRED BY THE USER) Please create a pull request in the target repository to merge '$TARGET_BRANCH' into 'main'. (PR review is ideally required)"

# Step 6: Remove the project directory from the original repository
echo "[Step 6] Removing '$PROJECT_PATH' directory from the source repository branch '$SOURCE_BRANCH'..."
cd "$ORIGINAL_REPO_PATH"
git rm -r "$PROJECT_PATH"
git commit -m "Remove $PROJECT_PATH after migrating to a separate repository"
git push origin "$SOURCE_BRANCH"

# Step 7: Provide instructions for creating a pull request
echo "[Step 7] Branch '$SOURCE_BRANCH' has been updated! Please check it out!"
echo "[Step 7] TODO: (REQUIRED BY THE USER) Please create a pull request in the source repository to merge '$SOURCE_BRANCH' into 'main'. (PR review is ideally required)"

# # Clean up temporary branch and remote in the source repository
# echo "Cleaning up temporary branch '$SPLIT_BRANCH' in source repository..."
# git branch -D "$SPLIT_BRANCH"

echo "Split process completed successfully!"
```

This script needs to be used along with a start script `run.sh`
```bash
#!/bin/bash

######               PARAMS           ######
# SCRIPT_PATH                         The Util script (local path)
# PROJECT_PATH:                       The RELATIVE PATH of the project you want to seperate
# The fetched source repository (local path)
# ORIGINAL_REPO_PATH:                 The fetched source repository (local path)
# NEW_REPO_SSH_URL:                   The target repository (git URL)
# SOURCE_BRANCH:                      The working branch on the source repo
# TARGET_REPO_CLONE_PATH:             Define the path where repo2 will be cloned


###### [Dev] dev_script testing USAGE: ######
SCRIPT_PATH="./archieve_projects.sh"
PROJECT_PATH="test_repo_seperation/project4_to_move"
# PROJECT_PATH="test_repo_seperation/project3_to_move"
# PROJECT_PATH="test_repo_seperation/project2_to_move"
# PROJECT_PATH="test_repo_seperation/project_to_move"
ORIGINAL_REPO_PATH="./dev_scripts"
NEW_REPO_SSH_URL="<your github repo URL>"
SOURCE_BRANCH="legacy_removal_dev"
TARGET_REPO_CLONE_PATH="/tmp/archieve_tmp"

###### EXECUTION: ######
$SCRIPT_PATH $PROJECT_PATH $ORIGINAL_REPO_PATH $NEW_REPO_SSH_URL $SOURCE_BRANCH $TARGET_REPO_CLONE_PATH 2>&1 | while IFS= read -r line; do echo "$(date +'%Y-%m-%d %H:%M:%S') $line"; done | tee log_test.out
```

