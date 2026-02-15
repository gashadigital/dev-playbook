# Introduction to Git & Version Control

Git is a **version control system** that tracks changes in your code over time. It allows you to revert to previous versions, work on new features without breaking the main app, and collaborate with other developers.

## 1. Essential Setup

Before you start, you need to tell Git who you are. This information is attached to every commit you make.

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"
```

## 2. Starting a Repository

You can either start a new project from scratch or download an existing one.

- `git init`: Initializes a brand new Git repository in your current folder.

- `git clone <url>`: Downloads an existing repository from GitHub/GitLab to your machine.

## 3. The Daily Workflow

This is the "Stage, Commit, Push" cycle you will use every day.

### Step 1: Check Status

```bash
git status
```

This shows you which files have been modified and which are "untracked" (new).

### Step 2: Stage Changes

Before saving, you must "add" files to the staging area.

```bash
git add filename.txt  # Add a specific file
git add .             # Add ALL modified and new files
```

### Step 3: Commit

A commit is a "snapshot" of your code at a specific moment.

```bash
git commit -m "feat: added crud method for the types logic"
```

_Note: Always use descriptive messages!_

### Step 4: Push to Server

Send your local snapshots to the online repository (GitHub).

```bash
git push origin main
```

## 4. Branching (Working on Features)

Branches allow you to work on a new feature without affecting the "Production" (main) code. This is essential for professional workflows and experimenting safely.

- `git branch <name>`: Creates a new branch with a specific name.
- `git checkout <name>`: Switches your current working environment to that branch.
- `git checkout -b <name>`: A shortcut to create AND switch to the new branch at the same time.
- `git merge <name>`: Combines the changes from the specified branch back into your current branch (usually `main`).

## 5. Staying Up to Date

If you are working with a team or across different computers, you need to sync your local work with the server.

- `git pull`: Downloads changes from the server and merges them into your local code immediately.
- `git fetch`: Downloads the history from the server but doesn't change your code yet (safer for checking what's new before merging).

## 6. The "Undo" Commands

Accidents happen. Here is how to fix common mistakes:

| Command | Action |
| :--- | :--- |
| **`git checkout -- <file>`** | Discard local changes in a specific file (revert to last commit). |
| **`git commit --amend`** | Add forgotten changes to your _last_ commit or fix the commit message. |
| **`git reset --soft HEAD~1`** | Undo the last commit but **keep** your work in the files. |
| **`git reset --hard HEAD~1`** | **DELETE** the last commit and all work associated with it. (Use with caution!) |

## 💡 Best Practices

1. **Commit Often:** Smaller, frequent commits are easier to debug than one giant "end of day" commit.
2. **Pull Before You Push:** Always check for updates from your team before sending your own to avoid merge conflicts.
3. **Use .gitignore:** Create a file named `.gitignore` in your root folder to list files Git should ignore (like `node_modules/`, `.env`, or build folders).
