# Networ-Analyzer - Python + ReactJS Project

This is a FastApi application for analyzing social networks.
The project can either be launch using Docker inside a container/s or run directly on the user's machine.

The first case is the prefered, since the user will only have to run a command to create and launch the a container that runs the application with everything setup.The two main advantages of this are that: (1) on the one hand, all the dependency installation and configuration is automatic and only done inside the container, so the host machine is not modified; and (2) the enviroment the app runs only depends on the container, if the same image is always used, the container will always be configured the same way accross different hosts.

On the second case, while it can present difficulties when setting up the enviroment since it has to be done manually and in different enviroments, it allows to run and debugg the application while working on it.

## Datasets

<div class="warning" style='background-color:#FAF3FC; color: #5B5B59; border-left: solid #EB6849 4px; border-radius: 2px; padding:0.7em;'>
<span>
<p style='margin-top:1em;margin-left:1em; text-align:justify'>
<b>NOTE: Hate speech datasets generation</b></p>
<p style='margin-left:1em;'>
The users' content dataset used to analyze cybercrimes may contain hate speech content. Due to the type of content this datasets may, they have not been upload to into this Github. In order to be able to use the app, it is neccesary to add a dataset with messages for each user of the network. There are two ways to obtain this datasets.<br><br>
    The first way is by simply requesting it to the author of this project.  This dataset needs to be added to the folder /mongodb-docker/mongo-seed/ with the name dataset.json.<br><br>
    The second one is by generating it using the original dataset and the Notebooks and Scripts present in this project. In this section there is more information about how to do this.
</p>
</p></span>
</div>
<br>

### Download Original DataSet
The original dataset is a CSV file with the contents of hundreds of tweets. It can be donwloaded from this site (you may need to login or create an account).

```bash
https://www.kaggle.com/datasets/joulespinozasanchez/web-scrapping-twitter-racism
```

### Process Dataset With NoteBook
In this step the downloaded dataset is going to be parsed and converted to other formats generating a series of CSV and JSON files. Make sure Pandas is installed on the python enviroment.

Fist, go to the python_notebook folder of the GitHub project, and save the dataset on the following folder:

```bash
./python_notebooks/datasets/dataset_racism/twitter_scrapping.csv
```
Make sure the output folder exists:
```bash
./python_notebooks/datasets/proccessed/racism/
```

Once done, use the test_proccess_dataset.ipynb Jupyter Notebook to generate the datasets, including a list of tweets by user, a graph dataset, and a likes list. In this case we need to copy the following dataset:

```bash
./python_notebooks/datasets/proccessed/racism/tweets_by_user.json
```
### Generate a Test Dataset for the Graph Nodes
In this step the JSON file will be used to asign tweets to each of the nodes of the network.

Go to the net-analyzer folder of the GitHub project, and copy the tweets_by_user.json into the scripts folder.

```bash
./net-analyzer/scripts/hatespeech-dataset
```
Run the script on the same folder to generate the mongodb dataset.

```bash
python3 generate_dataset.py
```
This will generate the file dataset.json. Copy this file in the following folder so it setup on the MongoDB instance when using the Docker setup.
```bash
./net-analyzer/mongodb-docker/mongo-seed
```

## Docker Container
First make sure Docker engine is installed on the host machine. If not, install Docker on the machine following the [Docker documentation](https://docs.docker.com/engine/install/).

To setup the container, first, go to the net-analyzer folder.
```bash
cd net-analyzer
```
To build and run the container for the first time, use the Docker compose command.
```bash
docker compose up --build -d
```
For older versions of docker change docker compose for docker-compose.

After the initial setup, if the container/s is not running the following command can be used to start the application:
```bash
docker compose up
```

When the application is started, it may take several minutes to completly load due to the NLP model configuration. Wait until the following logs appears on the console before opening the application.
```bash
net-analyzer  | bert_classifier_bert_base_uncased_hatexplain download ...
net-analyzer  | Approximate size to download 391.1 MB

... (NLP model download takes several minutes)

net-analyzer  | INFO:     Started server process [1]
net-analyzer  | INFO:     Waiting for application startup.
net-analyzer  | INFO:     Application startup complete.
net-analyzer  | INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

If you do not see any log, use the following command to see the logs of the application:
```bash
docker logs net-analyzer
```
The column net-analyzer, may not appear in this case.


After this, the will be available two services one for the Net-Analyzer application and another one for MongoDB client, both accesible from a web browser.

The application can found on:
```bash
0.0.0.0:8000
```
The MongoExpress client can be found on:
The application can found on:
```bash
0.0.0.0:8081
```

## Local Execution
This project can be manually run from the command line or it can be run directly from VSCode Run and Debug screen.

### Manually Setup the Project
In this section it is explained how setup the project before running it. It is only necessary to do this setup once per machine.

#### 1. Install Java SDK.
Spark-Nlp requires Java to work. As such it is neccesary to install it. [Spark-NLP Documentation](https://sparknlp.org/docs/en/quickstart) recomends Java 11 o 8, but this application has been developed using Java 17 without issues.

To install Java 17 on Ubuntu use the following commands:
```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

After this make sure java is on the system PATH by running
```bash
java --version
```

If the versión is not the one desired, configured it by using
```bash
sudo update-alternatives --config java 
```

If a command not found is reported, in Ubuntu use the the following commands to setup the system PATH - on Windows use the Enviroment Variables on System configuration -.
```
export JAVA_HOME=/usr/local/openjdk-17
export PATH=$JAVA_HOME/bin:$PATH
```

#### 2. Python Dependencies Installation
The BackEnd runs on Python, and uses a few dependencies that are outside 

```bash
pip install -r requirements.txt
```

#### 3. Mount MongoDB Database
To mount MongoDB Database use the docker-compose.yml on the 
First install Docker and run the following command from the mondodb_local_docker folder.
```bash
docker compose up
```
Or in older version of Docker.
```bash
docker-compose up
```


### Manualy Running the Project
In this section it is explained how to launch the project from the comand line.

#### Building ReactJS Client

Got to the folder app/rect-app and install the ReactJS dependencies.
```bash
npm run install
```

Then run the build command. 
```bash
npm run build
```
This will install all the needed dependencies for the front-end and it will also build the application.

#### Running the application

```bash
uvicorn app.main:app --reload
```
### Using VSCode to Run the Project
In this section it is explained how to run the project using the VSCode IDE, this allows to easyly build both the front-end and the back-end, and run or debugg the project, in a single step.

#### 1. Install Extensions

Make sure the [extension for Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) is installed. It is also recommended to install the [extension for Docker](https://code.visualstudio.com/docs/containers/overview), to easyly manage the MongoDB containers.

#### 2. Run The application

The folder .vscode, contains the configuration for the IDE workspace envirement, but it also contains the configuration for the execution of the application. Two launch configuration have been created, one for compiling and running the whole application and another one for building the front-end - if the application is running and we are changing the front-end this task allows for it to be build and reload without reestrating the server -.

On the VSCode IDE, go to the Debugg and Run screen, and there a two options:

1. Build and Run Flask app: that builds and start the whole application.

2. React Build (npm): that rebuilds the front-end allowing to load the changes without restarting the whole application..

The application can be run by either pressing the F5 key from anywhere on the VSCode IDE - make sure the proper option is selected -, or by clicking the Play button on the Run and Debugg screen.

