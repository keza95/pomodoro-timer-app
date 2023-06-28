FROM python:3.9.6
EXPOSE 5000
WORKDIR /app.py
RUN pip install flask
COPY . .
ENV FLASK_APP=app.py
CMD ["flask", "run", "--host", "0.0.0.0"]
