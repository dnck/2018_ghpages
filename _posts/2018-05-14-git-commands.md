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

**get a git repo**
```
git clone website
```

**basic flow**
```
git add *
git commit -m "message"
git push
```

**checkout branch**
```
git checkout branch_name
```

**Show local and remote branches**
```
git branch -a
```

**checkout branch from the remote not just the local**
```
git checkout origin/branch_name
```

**delete remote branch after done**
```
git push origin --delete branch_name
```
