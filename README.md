# Watchtower

AM-Sentry

Setup Guide

1) Create a virtual environment for the backend. Ensure you have python installed on ur device.
On MacOS, run: python3 -m venv env

On Windows, run: python -m venv env

2) Activate the virtual environment.
On MacOS, run: source env/bin/activate

On Windows, run: env\Scripts\activate.bat

Note: If you're using PowerShell and encounter an error, switch your terminal to Command Prompt.

3) Navigate to the backend folder:
run: cd backend

4) Install the backend requirements:
run: pip install -r requirements.txt

Note: Make sure your virtual environment is activated before installing.

5) Open a new terminal window or split terminal into 2 panes.
In one terminal, navigate to the backend folder (if not already):
run: cd backend

Run the backend server:
run: python manage.py runserver

6) In the second terminal, navigate to the frontend folder:
run: cd frontend

7) Install the frontend dependencies:
run: npm install axios react-router-dom jwt-decode

Note: Make sure Node.js is installed. After installing Node.js, you may need to restart your code editor for the terminal to recognize the npm command.

8) Run the frontend server:
run: npm run dev

9) Access the app:
Frontend: http://localhost:5173

Backend: http://localhost:8000
