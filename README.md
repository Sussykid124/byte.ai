# Byte.ai

Byte.ai is a web-based tool that lets you generate a complete app or
website from a simple prompt --- and automatically publishes it to your
GitHub account.\
All you do is describe what you want. Byte.ai handles the code, repo
creation, and upload.

------------------------------------------------------------------------

## ✨ Features

-   **AI-Generated Projects**\
    Converts a natural-language prompt into a full project structure
    with code and assets.

-   **Automatic GitHub Repository Creation**\
    Creates a brand-new repository in the user's GitHub account.

-   **Auto-Commit & Push**\
    Uploads all generated files directly into the new repo --- no manual
    setup required.

-   **Zero Setup Needed**\
    Everything runs through the app; no local tools or command-line
    steps required.

------------------------------------------------------------------------

## 🧠 How It Works

### 🗣️ 1. User Prompt

The user enters a description such as:

-   "Build me a todo app in vanilla JavaScript."\
-   "Generate a personal portfolio website."\
-   "Make a simple landing page for a mobile app."

### 🤖 2. AI Code Generation

The backend sends the prompt to an AI model (via OpenRouter) that
generates:

-   HTML\
-   CSS\
-   JavaScript\
-   Assets or additional files as needed

The output becomes a complete, ready-to-push project folder.

### 🐙 3. GitHub Automation

Using the user's GitHub authentication token, the system:

-   Creates a new repository\
-   Adds all generated project files\
-   Commits the code\
-   Pushes everything to GitHub automatically

### 🔁 4. Project Ready

The user can instantly open the new repo and view, clone, or deploy
their generated project.

------------------------------------------------------------------------

## 🧩 Tech Stack

-   **Languages:** HTML, CSS, JavaScript\
-   **Frontend:** HTML/CSS\
-   **Backend:** JS\
-   **APIs:**
    -   AI model via **OpenRouter**\
    -   **GitHub API** for repos, commits, and file uploads

------------------------------------------------------------------------

## 📁 Project Structure (conceptual)

    byte-ai/
      index.html        
      style.css         
      script.js        
      README.md         # Project documentation

------------------------------------------------------------------------

## 🌱 Future Improvements

-   Template presets (mobile app, game, bot, dashboard, etc.)\
-   Customizable README, license, repo name\
-   In-browser code editor before pushing files\
-   Ability to update an **existing** repository\
-   Option to generate multi-file or framework-based apps (React, Vue,
    Svelte)

------------------------------------------------------------------------

## 📌 Status

-   **Project Type:** Working prototype\
-   **Current Progress:** Core generation + GitHub upload works.\
    Improving UI, error handling, and customizable options.
