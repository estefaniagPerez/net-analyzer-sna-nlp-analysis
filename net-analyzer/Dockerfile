# Use Node.js to build the frontend
FROM node:20.5.0-alpine as build

# Copy the rest of the application files
COPY /app /app

# Build the Vite app
WORKDIR /app/react-app
RUN npm install . && echo "NPM install completed successfully"
RUN npm run build && echo "NPM build completed successfully"

# Set the working directory to /app
WORKDIR /app
# Use a Python image for the backend
FROM python:3.10

# Install MongoDB, OpenJDK 11, and other necessary packages
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    gnupg2 \
    software-properties-common \
    && apt-get clean \
    openjdk-17-jdk-headless

RUN wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb && \
    dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb && \
    rm libssl1.1_1.1.1f-1ubuntu2_amd64.deb


RUN apt-get update && \
    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add - && \
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/debian buster/mongodb-org/6.0 main" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list && \
    apt-get update && \
    apt-get install -y mongodb-org && \
    apt-get clean

# Set JAVA_HOME environment variable for OpenJDK
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH

# Set the working directory in the container
WORKDIR /app

# Copy requirements.txt and install Python dependencies
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Install Spark NLP
RUN pip install spark-nlp

# Copy code into the container
COPY ./app /app

# Create directory for MongoDB data
RUN mkdir -p /data/db /var/log/mongodb

EXPOSE 8000
EXPOSE 27017

# Copy the dataset
COPY ./dataset.json /app/dataset.json

# Run MongoDB, load the dataset, and start FastAPI
CMD ["bash", "-c", "mongod --dbpath /data/db --logpath /var/log/mongodb/mongod.log --fork && \
    until mongo --eval 'print(\"waited for connection\")' || sleep 1; do echo 'Waiting for MongoDB...'; done && \
    mongoimport --db my_database --collection my_collection --file /app/dataset.json --jsonArray && \
    uvicorn main:app --host 0.0.0.0 --port 8000"]
