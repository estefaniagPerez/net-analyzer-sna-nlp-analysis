# Net-Analyzer - SNA & NLP
![Python Badge](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff&style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Jupyter Badge](https://img.shields.io/badge/Jupyter-F37626?logo=jupyter&logoColor=fff&style=for-the-badge)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MongoDB Badge](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff&style=for-the-badge)



**Net-Analyzer**, is a final year master's degree project focus on the detection of cybercrime through analytical techniques. In an era where digital threats are ever-evolving, safeguarding our online environments has never been more critical. Our project harnesses the power of **Social Network Analysis (SNA)** and **Natural Language Processing (NLP)** to identify, analyze, and mitigate malicious activities in cyberspace.

<p align="center">
  <img src="https://github.com/user-attachments/assets/0cc8a399-036f-46fc-b70b-c46de73226c2" />
  <br>
</p>


## Table of Contents
1. [License](#license)
2. [GitHub Repository Structure](#github-repository-structure)
3. [Datasets](#datasets)


## License
This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the software as per the terms of the license. 
We are not responsible for how third parties use the information provided by this project. The project is intended solely for academic purposes.
Net-Analyzer is designed for academic research and educational purposes. Any other use is not authorized and done at the user's own risk.

## GitHub Repository Structure

This repository has two parts:

1. [Net-Analyzer](net-analyzer): a web application that detects influencers and bridges in a social network graph, and analyzes the level of hate speech that is spreading in the network.

2. [Python Notebooks](python_notebooks): Jupyter Notebooks used to study NetworkX tool for SNA analysis, and Spark-Nlp tool for NLP analysis.

## Datasets


### **_NOTE:_** Hate speech datasets generation

> The dataset that has the users' content - used to analyze cybercrimes - may contain hate speech content. Due to the type of content these datasets have not been uploaded into this Github. In order to be able to use the application, there needs to be dataset with all the messages done by the users. There is two ways to obtain these datasets.<br><br>
> The first way is asking for it to the author of this project. This dataset needs to be added to the folder /mongodb-docker/mongo-seed/ with the name dataset.json. <br><br>
> The second option is to generate the dataset using the original dataset and the Notebooks and Scripts present in this project. Below there is more information about how to generate this dataset.

### Download Original DataSet
The original dataset is a CSV file with the contents of hundreds of tweets. It can be donwloaded from the following site (you may need to login or create an account).

```bash
https://www.kaggle.com/datasets/joulespinozasanchez/web-scrapping-twitter-racism
```

### Process Dataset With NoteBook
In this step the dataset is going to be parsed and converted to other formats, generating a series of CSV and JSON files. Make sure Pandas is installed on the python enviroment.

Fist, go to the python_notebook folder of the GitHub project, and save the dataset on the following folder:

```bash
./python_notebooks/datasets/dataset_racism/twitter_scrapping.csv
```
Make sure the output folder exists:
```bash
./python_notebooks/datasets/proccessed/racism/
```

Once done, use the test_proccess_dataset.ipynb Jupyter Notebook to generate the datasets: a list of tweets by user, a graph dataset, and a list of likes. We will need to copy the following dataset:

```bash
./python_notebooks/datasets/proccessed/racism/tweets_by_user.json
```
### Generate a Test Dataset for the Graph
In this step a JSON file will be used to asign tweets to every node in the network.

Go to the net-analyzer folder in this GitHub project, and copy the tweets_by_user.json into the scripts folder.

```bash
./net-analyzer/scripts/hatespeech-dataset
```
Run the script on the same folder to generate the mongodb dataset.

```bash
python3 generate_dataset.py
```
This will generate the file dataset.json. Copy this file into the following folder in order to configure it in MongoDB, this dataset will be loaded into the instance when using the Docker compose option to launch the project.
```bash
./net-analyzer/mongodb-docker/mongo-seed
```



