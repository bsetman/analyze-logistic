# Сервис по анализу регионально-транспортной логистической системы

---

## Инструкция по запуску

### Требования
- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) (входит в состав Node.js)
- [Python](https://www.python.org/) 3.9+

### Установка и запуск
Создание виртуального окружения
```bash
mkdir analyze-logistic/ && cd analyze-logistic && python -m venv env
```

Активация виртуального окружения
* на Linux
  ```bash
  source env/bin/activate
  ```
* на Windows
  ```bash
  env\Scripts\activate
  ```

Установка зависимостей
```bash
cd logistic-backend-python/ && pip install -r "requirements.txt" && cd ..
```

Запуск приложения 
* на Linux
  ```bash
  ./start.sh
  ```
* на Windows
  ```bash
  start.bat
  ```

### Структура репозитория

```markdown
.
├── logistic-frontend/        # Фронтенд на Vite 
│   ├── package.json
│   ├── src/
│   └── ...
│
├── logistic-backend-python/  # Бэкенд на FastAPI        
│   ├── models
│   ├── services
│   ├── main.py             
│   └── ...
│
├── start.sh                  # Скрипт запуска (Linux/macOS)
├── start.bat                 # Скрипт запуска (Windows)
└── README.md
```


