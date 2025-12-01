# Byte.ai

Byte.ai is a web app where you can ask an AI to generate a simple app or website for you, and it will:

1. Generate all the project files (code, assets, etc.)
2. Create a new GitHub repository in your account
3. Push all the generated files into that repo automatically

## ✨ What it does

- Takes a prompt like: “Make me a todo app in JavaScript” or “Make a simple portfolio website”
- Uses AI to generate the code for the project
- Uses the GitHub API to:
  - Create a new repo under the user's account
  - Commit the generated code
  - Push everything so it’s instantly available on GitHub

## 🧠 Tech stack

- Language: (e.g. JavaScript / Python / both)  
- Frontend: (e.g. HTML/CSS/JS, React, etc.)  
- Backend: (e.g. Node.js / Python + Flask / etc.)  
- APIs:
  - AI model: (e.g. OpenAI / local model / other)
  - GitHub API for repo creation and commits

## 🏗️ How it works (high level)

1. User enters a prompt describing the app/site they want.
2. Server sends the prompt to an AI model to generate project code.
3. Server uses the GitHub API with the user’s auth token to:
   - Create a new repository
   - Add the generated files
   - Commit + push
4. User gets a link to their new GitHub repo.

## 🌱 Future ideas

- Add templates: mobile app, game, bot, etc.
- Let users customize license / README / project name
- Add UI to edit files before pushing to GitHub
- Let the AI update an existing repo instead of always making a new one

## 📌 Status

- Project type: **Working prototype** / **In progress**  
- Current state: (write a sentence like “Basic flow works, working on better error handling and UI.”)
