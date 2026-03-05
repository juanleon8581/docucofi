---
description: Quick commit for staged files with conventional commit format
---

# Quick Git Commit for Staged Files

Follow these optimized steps to create a commit for staged files efficiently.

1. **Check Status & Analyze Changes**
   - First, check if there are staged files.
   - **CRITICAL**: If there are NO staged files (empty output or no 'M'/'A'/'D' in the first column), **STOP IMMEDIATELY**. Do not proceed. Do not hallucinate a commit.
   - If there ARE staged files, analyze the changes using `git diff` to understand what to commit.
   - **Token Optimization**: Do NOT use `view_file` to read full files unless absolutely necessary (e.g., if the diff is missing critical context). Rely on the diff.

   ```bash
   git status --porcelain
   # // turbo
   git diff --cached
   ```

2. **Generate Message & Commit**
   - Based _only_ on the diff analysis above, generate a **Conventional Commit** message.
   - **Format**: `<emoji> <type>: <description>`
   - **Context**: Analyze the nature of the changes (feature, bug fix, refactor, style, etc.).
   - **Language**: Message text must be in **English**.
   - **Rule**: Keep it atomic. If you see multiple distinct changes, you may propose just one commit for now or ask, but usually, try to group them logically if they are related.

   **Emoji Reference**:
   - ✨ feat: A new feature
   - 🐛 fix: Bug fix
   - 📝 docs: Documentation changes
   - 💄 style: Code style changes (formatting, etc)
   - ♻️ refactor: Code refactoring
   - ⚡️ perf: Performance improvements
   - ✅ test: Adding or fixing tests
   - 🔧 chore: Changes to the build process, tools, etc.
   - 🚀 ci: CI/CD improvements
   - 🗑️ revert: Reverting changes
   - 🧪 test: Add a failing test
   - 🚨 fix: Fix compiler/linter warnings
   - 🔒️ fix: Fix security issues
   - 👥 chore: Add or update contributors
   - 🚚 refactor: Move or rename resources
   - 🏗️ refactor: Make architectural changes
   - � chore: Merge branches
   - 📦️ chore: Add or update compiled files or packages
   - ➕ chore: Add a dependency
   - ➖ chore: Remove a dependency
   - 🌱 chore: Add or update seed files
   - 🧑‍💻 chore: Improve developer experience
   - 🩹 fix: Simple fix for a non-critical issue
   - 🎨 style: Improve structure/format of the code
   - 🚧 wip: Work in progress
   - 👷 ci: Add or update CI build system
   - 💥 feat: Introduce breaking changes
   - 🗃️ db: Perform database related changes
   - 🦺 feat: Add or update code related to validation

   Construct and propose the commit command:

   ```bash
   git commit -m "<emoji> <type>: <description>"
   ```

3. **Verify**
   - Immediately after the commit, verify it was successful.

   ```bash
   git log -1 --stat
   ```
