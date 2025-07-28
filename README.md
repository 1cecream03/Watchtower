# Watchtower

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

4) Create and edit .env file under the backend folder.

run: cp .env.example .env

5) Open .env and update SECRET_KEY and OPEN_API_KEY

To generate SECRET_KEY, 

run: python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

To generate OPENAI_API_KEY, add your own OpenAI API key (get it from https://platform.openai.com/account/api-keys)

6) Install the backend requirements:
   
run: pip install -r requirements.txt

Note: Make sure your virtual environment is activated before installing.

7) Apply database migrations

python manage.py migrate


8) Run the backend server:
   
run: python manage.py runserver (http://localhost:8000/)

9) On a seperate terminal, navigate to frontend folder

run: cd frontend

10) Install frontend dependencies

run: npm install

11) Run frontend server (http://localhost:5173) 

run: npm run dev
