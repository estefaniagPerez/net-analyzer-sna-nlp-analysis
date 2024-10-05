# Net-Analyzer - SNA & NLP
![Python Badge](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff&style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Jupyter Badge](https://img.shields.io/badge/Jupyter-F37626?logo=jupyter&logoColor=fff&style=for-the-badge)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MongoDB Badge](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff&style=for-the-badge)



**Net-Analyzer**, is a final year master's degree project dedicated to helping with the detection of cybercrime through analytical techniques. In an era where digital threats are ever-evolving, safeguarding our online environments has never been more critical. Our project harnesses the power of **Social Network Analysis (SNA)** and **Natural Language Processing (NLP)** to identify, analyze, and mitigate malicious activities in cyberspace.


## Table of Contents
1. [License](#license)
2. [Datasets](#datasets)


## License
This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the software as per the terms of the license. 
We are not responsible for how third parties use the information provided by this project. The project is intended solely for academic purposes.
Net-Analyzer is designed for academic research and educational purposes. Any other use is not authorized and done at the user's own risk.

## GitHub Repository Structure

This repository contains two parts:

1. [Net-Analyzer](net-analyzer): folder that contains the web application that given a social network graph is capable to 

2. [Python Notebooks](python_notebooks): folder that contains Jupyter Notebooks primary used to study the NetworkX tool for SNA analysis, and the Spark-Nlp tool for NLP analysis.

## Datasets


### **_NOTE:_** Hate speech datasets generation

> The users' content dataset used to analyze cybercrimes may contain hate speech content. Due to the type of content this datasets may, they have not been upload to into this Github. In order to be able to use the app, it is neccesary to add a dataset with messages for each user of the network. There are two ways to obtain this datasets.<br><br>
> The first way is by simply requesting it to the author of this project.  This dataset needs to be added to the folder /mongodb-docker/mongo-seed/ with the name dataset.json. <br><br>
> The second one is by generating it using the original dataset and the Notebooks and Scripts present in this project. In this section there is more information about how to do this.<br>


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



