# SNA and NLP Analysis
In this proyect there is series of Jupyter with research of the different functionalities used by the SNA and NLP libraries used for the Net-Analyzer project. This Notebooks also include implementations similar at those use on the may project. Al the steps on the NoteBooks is documented inside the Notebooks themselves, in Markdown format.

## Structure
The structure of the folther is as follows

+ **README.md**: this file

+ **test_networkx.ipynb**: this Notebook contains the research done with the NetworkX library in order to analyse social networks.

+ **test_nlp.ipynb**: this Notebook contains the research done with the Spark-Nlp library in order to analyse social networks.

+ **test_proccess_dataset.ipynb**: this Notebooks mainly uses pandas to modify CSV to test them with the other Notebooks.

+ **sna_dataset.csv**: the dataset used for the tests.

+ **new_csv_file**: other dataset used for comparation

+ **models**: download NLP models from Spark-Nlp directly for testing locally stored models.

+ **sna_python.code-workspace**: VSCode configuration file.
+ **.venv**: python virtual enviroment.

+ **.vscode**: VSCode configuration for the project


## How to Setup Jupyter

This section explains how to setup conda on VSCODE with its own enviroment
### Install Anaconda in Linux

 To install Conda (Anaconda or Miniconda) on a Linux system, you can follow these steps:

#### Step 1: Download the Installer
You can download the installer for either Anaconda or Miniconda from the [Anaconda website](https://www.anaconda.com/products/distribution). For example, to download the latest version of Miniconda (a minimal installation), you

 Installing Conda (Anaconda or Miniconda) on a Linux system involves downloading the installer and running it. Here are the steps for both Anaconda and Miniconda installations:

 #### For Anaconda:

1. **Download the Installer:**
   - Go to the [Anaconda website](https://www.anaconda.com/products/distribution) and choose the appropriate version for your Linux distribution. The most common versions are Python 3.x.
   - Download the installer script by clicking on the "Download" button next to the version number.

2. **Make the Installer Executable:**
   ```bash
   chmod +x ~/Downloads/Anaconda3-<version>-Linux-x86_64.sh
   ```

3. **Run the Installer:**
   ```bash
   bash ~/Downloads/Anaconda3-<version>-Linux-x86_64.sh
   ```
   - Follow the on-screen instructions to complete the installation. You will be prompted to accept the license agreement and choose a default install location (usually `~/anaconda3`).

4. **Configure Conda: (Optional)**
   - After installation, you might want to configure conda by adding it to your shell profile file (e.g., `.bashrc`, `.zshrc`, etc.).
   ```bash
   echo 'export PATH="~/anaconda3/bin:$PATH"' >> ~/.bashrc
   source ~/.bashrc
   ```


#### Verify the Installation:
After installation, you can verify that conda is installed correctly by running:
```bash
conda --version
```
This should display the version of Conda installed.

If you encounter any issues during the installation, please provide more details so I can assist you further.


### For Not Anaconda Install
 The dependencies for using Jupyner without conda, this can be done installing Jupyter notebooks from pip.
```bash
pip install jupyterlab
```


### Java Requirements for Spark-NLP
In order to use Spark-NLP with Python it is necessary intall a version Java as stated on the Spark-NLP documentation [Spark-NLP](https://sparknlp.org/docs/en/quickstart).
While the documentation indicates Java 8 or Java 11 - or OpenJDK -, this has been tested with a latter versione - OpenJDK 17 -. To install Java in Ubuntu the following commands can be used.
```bash
sudo apt update
sudo apt install openjdk-17-jdk
```
Make sure java is on accesible from the terminal and has the proper version:
```bash
java -version
javac -version
```
If this are not available from the terminal, configure JAVA_HOME and restart the computer:
```bash
JAVA_HOME=/usr/lib/<path_to_openjdk>
PATH=$PATH:$HOME/bin:$JAVA_HOME/bin
```

### Setup VSCode
#### Step 1: Install the Jupyter extension on VSCODE
To setup Jupyter in VSCODE, install the extension for [Jupyter by microsoft](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter).
Either by going to the extantions market on the VSCODE or by using the following comand.
```bash
ext install ms-toolsai.jupyter
```

#### Step 2: Configure a conda enviroment
On VSCODE open the folder that will contain your proyect. Once done, press `Ctrl+Shift+P` to bring up the command palette and type "Python: Create Enviroment". On the selection list, chose conda to create a new conda enviroment (this should be your newly created Conda environment).

#### Step 3: Intall Jupyter
Open a new terminal (to make sure is using the new enviroment) and use the info command to make sure you are on the newly create enviroment.
```bash
conda info
```
This should point to the folder `.cond` inside the current project folder. Then install the Jupyter package inside the conda enviroment with the following command:
```bash
conda install jupyter
```

#### Step 4: Jupyter NoteBook
Create a notebook with the extension `.ipynb` and start coding.

It is necessary to install those dependences on the already created notebook. This can be done with pip and the requirements.txt file:
```bash
pip install -r requirements.txt
```

#### Step 5 (Optional): VSCode Jupyter Configuration
Notebook can be run directly con VSCode by installing the Jupyter Extension. More information on the [Microsoft Docs](https://code.visualstudio.com/docs/languages/python)