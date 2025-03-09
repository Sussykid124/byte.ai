# FILE: main.py
import os
import requests
import json
import subprocess
import webbrowser
import tkinter as tk
from tkinter import scrolledtext, messagebox, filedialog, ttk
from dotenv import load_dotenv
import re
import base64

# Load environment variables from .env file
load_dotenv()

# Memory file and project folder (this is the parent folder for all projects)
MEMORY_FILE = "memory.json"
PROJECT_FOLDER = "ByteAI_Projects"
os.makedirs(PROJECT_FOLDER, exist_ok=True)

# Load memory if file exists
if os.path.exists(MEMORY_FILE):
    with open(MEMORY_FILE, 'r') as f:
        conversation_memory = json.load(f)
else:
    conversation_memory = []  # Initialize as an empty list if memory file doesn't exist

# System-level prompt to ensure clean code output
system_prompt = {
    "role": "system",
    "content": (
        "You are Byte.ai, an advanced AI specialized in software development. "
        "Your tasks include understanding high-level prompts, planning software projects, "
        "generating clean code wrapped in triple backticks (```). "
        "IMPORTANT: Place # FILE: filename.extension inside the backticks at the start of each code block. "
        "Also, include a line starting with '# PROJECT:' followed by the project folder name. "
        "Always generate a README.md file describing the project, including setup instructions, usage, and features. "
        "If a Python file is created, generate a requirements.txt listing all dependencies. "
        "If a JavaScript file is created, generate a package.json with dependencies if needed. "
        "Add build automation scripts: build.sh for Linux/Mac and build.bat for Windows if applicable. "
        "Create a .gitignore file for Git if applicable. "
        "Log execution outputs and errors in a logs/execution.log file inside the project directory. "
        "Do NOT include explanations, comments, or any text outside these code blocks."
    )
}

# Log execution output and errors to logs/execution.log
def log_execution(filepath, output):
    project_path = os.path.dirname(filepath)
    logs_folder = os.path.join(project_path, "logs")
    os.makedirs(logs_folder, exist_ok=True)
    log_file = os.path.join(logs_folder, "execution.log")
    with open(log_file, 'a') as log:
        log.write(f"--- Execution Log for {os.path.basename(filepath)} ---\n")
        log.write(output + "\n")
        log.write("---------------------------------------------------\n")

# Save code to a file with support for project subfolders.
# If the filename doesn't include a folder, use the provided default_project.
def save_code_to_file(filename, code, default_project="my_project"):
    if "/" in filename:
        # If the filename includes a folder (project name), split it out.
        project_name_from_file, filename = filename.split("/", 1)
        project_path = os.path.join(PROJECT_FOLDER, project_name_from_file)
        used_project = project_name_from_file
    else:
        # Use the default project name provided.
        used_project = default_project
        project_path = os.path.join(PROJECT_FOLDER, used_project)
    os.makedirs(project_path, exist_ok=True)
    file_path = os.path.join(project_path, filename)
    try:
        with open(file_path, 'w') as file:
            file.write(code)
        messagebox.showinfo("Code Saved", f"Code saved to {file_path}!")
    except Exception as e:
        console_output.insert(tk.END, f"Error saving file: {str(e)}\n")
    return file_path, used_project

# Open HTML files in a browser
def preview_html_file(filepath):
    if os.path.isfile(filepath) and filepath.endswith(".html"):
        webbrowser.open(f"file://{os.path.abspath(filepath)}")
    else:
        console_output.insert(tk.END, f"Cannot preview {filepath} (Not an HTML file or missing)\n")

# Execute Python or JavaScript files and capture output
def execute_file(filepath):
    try:
        if filepath.endswith(".py"):
            result = subprocess.run(["python", filepath], capture_output=True, text=True)
        elif filepath.endswith(".js"):
            result = subprocess.run(["node", filepath], capture_output=True, text=True)
        else:
            console_output.insert(tk.END, f"Cannot execute {filepath} (Unsupported file type)\n")
            return
        output = result.stdout if result.stdout else result.stderr
        console_output.insert(tk.END, f"Output for {os.path.basename(filepath)}:\n{output}\n")
        log_execution(filepath, output)
    except FileNotFoundError as e:
        console_output.insert(tk.END, f"Error: {str(e)}\n")

# Extract code blocks and filenames from AI response
def extract_code_blocks(response):
    pattern = re.compile(r"```[\w]*\n(# FILE: .+?\..+)\n([\s\S]*?)\n```", re.MULTILINE)
    matches = pattern.findall(response)
    clean_blocks = []
    for file_marker, code in matches:
        filename = file_marker.replace("# FILE: ", "").strip()
        clean_blocks.append((filename, code.strip()))
    return clean_blocks

# Extract project name from AI response using the marker "# PROJECT:"
def extract_project_name(response):
    pattern = re.compile(r"# PROJECT:\s*(\S+)")
    match = pattern.search(response)
    if match:
        return match.group(1).strip()
    return None

# Clean AI response by extracting only code blocks
def clean_response(response):
    clean_code = extract_code_blocks(response)
    if clean_code:
        return clean_code
    else:
        with open("error_log.txt", 'a') as log_file:
            log_file.write("Unexpected AI Response:\n" + response + "\n\n")
        return []

# Get AI response from OpenRouter
def get_openrouter_response(prompt):
    api_key = os.getenv('OPENROUTER_API_KEY')
    if not api_key:
        raise ValueError("Please set your OpenRouter API key in the environment variable 'OPENROUTER_API_KEY'.")
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    messages = [system_prompt] + conversation_memory + [{"role": "user", "content": prompt}]
    payload = {
        "model": "google/gemini-2.0-pro-exp-02-05:free",
        "messages": messages,
        "temperature": 0.7
    }
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    response.raise_for_status()
    data = response.json()
    if "choices" in data and len(data["choices"]) > 0:
        reply = data["choices"][0]["message"]["content"].strip()
        conversation_memory.append({"role": "user", "content": prompt})
        conversation_memory.append({"role": "assistant", "content": reply})
        return reply
    return ""

# GUI Setup
root = tk.Tk()
root.title("Byte.ai - AI Assistant")
root.geometry("800x600")
notebook = ttk.Notebook(root)
notebook.pack(expand=True, fill='both')
chat_window = scrolledtext.ScrolledText(notebook, wrap=tk.WORD, state='disabled', width=70, height=25)
notebook.add(chat_window, text="Chat")
console_output = scrolledtext.ScrolledText(notebook, wrap=tk.WORD, state='normal', width=70, height=25)
notebook.add(console_output, text="Console")
input_box = tk.Entry(root, width=60)
input_box.pack(pady=5)

# Create GitHub repository using GitHub API
def create_github_repo(repo_name):
    github_token = os.getenv('GITHUB_TOKEN')
    if not github_token or github_token.strip() == "":
        messagebox.showerror("GitHub Token Missing", "Please set a valid GitHub token in the .env file.")
        return None
    url = "https://api.github.com/user/repos"
    headers = {
        "Authorization": f"Bearer {github_token}",
        "Accept": "application/vnd.github.v3+json"
    }
    payload = {
        "name": repo_name,
        "private": False  # Change to True for private repositories
    }
    console_output.insert(tk.END, f"Creating GitHub repository '{repo_name}'...\n")
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 201:
        repo_url = response.json().get("html_url")
        messagebox.showinfo("GitHub Repo Created", f"Repository created: {repo_url}")
        return repo_url
    else:
        error_message = response.json().get("message", "Unknown error")
        console_output.insert(tk.END, f"Failed to create GitHub repo: {error_message}\n")
        return None

# Push code to the GitHub repository
def push_to_github(repo_url, project_path):
    os.makedirs(project_path, exist_ok=True)  # Ensure the directory exists
    try:
        console_output.insert(tk.END, f"Initializing Git repository in {project_path}...\n")
        if not os.path.isdir(os.path.join(project_path, ".git")):
            subprocess.run(["git", "init"], cwd=project_path, check=True)
            subprocess.run(["git", "remote", "add", "origin", repo_url], cwd=project_path, check=True)
        subprocess.run(["git", "add", "."], cwd=project_path, check=True)
        subprocess.run(["git", "commit", "-m", "Initial commit"], cwd=project_path, check=True)
        subprocess.run(["git", "branch", "-M", "main"], cwd=project_path, check=True)
        subprocess.run(["git", "push", "-u", "origin", "main"], cwd=project_path, check=True)
        messagebox.showinfo("GitHub Push", f"Code pushed to {repo_url}!")
    except subprocess.CalledProcessError as e:
        console_output.insert(tk.END, f"Git push error: {str(e)}\n")

def send_message():
    user_input = input_box.get().strip()
    if user_input:
        chat_window.config(state='normal')
        chat_window.insert(tk.END, "You: " + user_input + "\n")
        chat_window.config(state='disabled')
        input_box.delete(0, tk.END)
        ai_response = get_openrouter_response(user_input)
        if ai_response:
            chat_window.config(state='normal')
            chat_window.insert(tk.END, "Byte.ai (Code):\n" + ai_response + "\n")
            chat_window.config(state='disabled')
            
            # Extract the project name from the AI response (if provided)
            extracted_project_name = extract_project_name(ai_response)
            default_project = extracted_project_name if extracted_project_name else "my_project"
            
            code_blocks = clean_response(ai_response)
            saved_files = []
            used_project_names = set()
            for filename, code in code_blocks:
                filepath, used_project = save_code_to_file(filename, code.strip(), default_project)
                saved_files.append(filepath)
                used_project_names.add(used_project)
                if filename.endswith(".html"):
                    preview_html_file(filepath)
                elif filename.endswith(".py") or filename.endswith(".js"):
                    execute_file(filepath)
            
            # Determine final project name: if a folder was specified in any file marker, use that; otherwise use the default.
            if len(used_project_names) == 1:
                project_name = used_project_names.pop()
            else:
                project_name = default_project
            project_path = os.path.join(PROJECT_FOLDER, project_name)
            console_output.insert(tk.END, f"Detected project name: {project_name}\n")
            repo_url = create_github_repo(project_name)
            if repo_url:
                push_to_github(repo_url, project_path)
        chat_window.yview(tk.END)

send_button = tk.Button(root, text="Send", command=send_message)
send_button.pack()
root.mainloop()
