@echo off

start /D "logistic-backend-python" python main.py
cd logistic-frontend
npm run dev