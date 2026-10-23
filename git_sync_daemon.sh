#!/bin/bash
# Autonomous Git Sync Daemon for entire NEXT directory
# Checks repository status every 5 seconds and pushes changes to GitHub

REPO_DIR="/home/samudra/Projects/VisualSCode/VisualCode/Vscoding/Projects/NEXT"
cd "$REPO_DIR" || exit 1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Git Sync Daemon started in $REPO_DIR (5s interval)"

while true; do
  # Check if there are any staged, unstaged, or untracked changes
  if [ -n "$(git status --porcelain)" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Changes detected across NEXT folder. Staging..."
    git add -A
    
    # Check again if there's anything staged to commit
    if ! git diff --cached --quiet; then
      COMMIT_MSG="chore(sync): automated sync of NEXT repository - $(date '+%Y-%m-%d %H:%M:%S')"
      echo "[$(date '+%Y-%m-%d %H:%M:%S')] Committing: $COMMIT_MSG"
      git commit -m "$COMMIT_MSG"
      
      echo "[$(date '+%Y-%m-%d %H:%M:%S')] Pushing to origin main..."
      if git push origin main; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Successfully pushed changes to GitHub."
      else
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Push failed or network issue; will retry on next cycle."
      fi
    fi
  fi
  sleep 5
done
