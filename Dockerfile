FROM python:3.10

WORKDIR /app

COPY backend/requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ /app/

RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "backend.wsgi:application"]