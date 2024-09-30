# Phase 1: node image for front-end
FROM node:18-alpine AS frontend-build

WORKDIR /app
# Build the React app
WORKDIR /app/app/react-app
RUN npm install
RUN npm run build

# Phase 2: openJDK image with python instalation for backend
FROM openjdk:17-slim

# Install Python Dependencies
WORKDIR /app
COPY netanalizer-app-docker/requirements.txt /app/requirements.txt
RUN apt-get update && apt-get install -y python3.9 python3-pip procps
RUN pip install -r requirements.txt

EXPOSE 8000
# Run FastAPI app with Uvicorn
CMD ["python3", "run.py"]
