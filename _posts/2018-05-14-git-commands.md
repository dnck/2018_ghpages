---
layout: post
title: git commands
date: 2018-05-14
comments: true
analytics: false
keywords: git, commands
description: simple git commands, no bullshit
tag: git, commands, KISS
category: git
---

These's are some of the common git commands I find myself googling a lot.

Enjoy.

**get a git repo**
```
git clone https://github.com/HelixNetwork/helix-whitepaper.git
```

**Show local AND remote branches**
```
git branch -a
```

**checkout and/or create your local branch**
```
git checkout branch_name
```

**checkout branch from the remote NOT just your local possibly new branch**
```
git checkout origin/branch_name
```

**basic flow to add changes to the current branch your working on**
```
git add *
git commit -m "message"
git push
```
Using the * means all all your changes

**update the repo to the most recent commits**
```
git pull
```

**delete remote branch after done your work on it**
```
git push origin --delete branch_name
```
