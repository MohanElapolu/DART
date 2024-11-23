# DART
DART: A Decentralized Application-based Requirement Traceability Framework for Cyber-Physical System Development

## Setup the application
1. Prerequisites: conda and python should be installed. Conda version 23.11.2 and up, Python version 3.11.2 and up, should work. 

3. Create and activate the virtual conda environment:
  - Windows (open anaconda prompt terminal)
```
$ conda create --name bc-env
$ conda activate bc-env
```
3. Download the blockchain_app directory. Open the anaconda prompt terminal in this directory.
4. Activate the conda virtual environment _bc-env_.
5. Install all the dependencies in the virtual environment
```
$ pip install -r dependencies.txt
```
4. Run the local node and web app:
```
$ python run.py
```
5. Your app is up and running in local network (Ex: http://localhost:5000, http://127.0.0.1:5000), copy the address and paste it onto any web browser. This will direct you to homepage of the web application.

## Cloudflare (Optional)
1. To broadcast the app running in the local network, you can use cloudflare. Install cloudflare following the instructions at their website (https://ngrok.com/).
2. For instance, your app is running on local network http://localhost:5000, the below command can be used which allows local network accessible to everyone..
```
cloudflared tunnel --url http://127.0.0.1:7545
```
2. The cloudflare will provide you the address that can be accessed by your peers.

##  Ganache blockchain test network
1. To start the network run the below command 
```
ganache-cli -h 127.0.0.1 -p 7545 -m mnemonic_phrase --db "path\to\store\blockchain\database" -l 10000000000000
```

## Dataserver
Go to the data layer folder to check instruction on how to start the dataserver. The files in this server can be accessed through the web application. 

## Metamask
Install the browser extension metamask following the instructions. Create the metamask account. We should also activate the local blockchain test network in the metamask. 

## Web-app User Interface
Go to the app layer to check instructions on installing and starting the web app.

### Home page and upload artifact
1. Figure 1 shows the home page of the user interface. To upload the artifact (excel file), user will be using this page. The user will provide the link of the artifact in the field _Enter Path to requirement artifact_ and uploads the artifact by clicking _Read File_. If the upload is successful, the transaction hash of the newly created block will be shown in the _Artifact Id_ field, if not the error in uploading the artifact is shown. <br>

<img src= "/assets_main/web_app_upload_artifact.jpg" width="300" height="250"> <br>
*Figure 1: Home page of the web application where users will upload the artifact* <br>
<br> 

## First Artifact (genesis block)
1. Use the template as shown in Figure 2 and fill all the necessary requirement traceability information. The sample template _artifact_template.xlsx_ is given in the home directory of the repository. <br>
   
<img src= "/assets_main/art_sample.jpg" width="650" height="150"> <br>
*Figure 7: Sample artifact that can be used to fill the necessary requirements traceability information* <br>
<br> 

3. Artifact Creators will be the stake holders involved in creating the artifact. <br>
   _Ex. Stake holder 1, Stake holder 2_
4. Artifact Name is the name of the artifact. Please use the below names to have consistency throughout the process. <br>
  _Ex: System Objective, Mission Requirements, System Requirements, Vehicle Requirements, Subsystem Requirements, Minutes of Meeting, Operating Procedures_
5. Parent Artifact ID is the hash of the block that the current artifact depends on. But for the first artifact there is no parent artificat. So you can give "_no parent artifact_".
7. Object is the smallest possible element of the document of a design activity. For instance, in a requirement document, a requirement is the object. In Minutes of meeting, each critical bullet point can become an object. For the first artifact it can be the system objective.
   _Ex. A high-speed autonomous off-road reconnaissance vehicle._
9. Parent Object is the smallest possible element that the current Object depends on. For the first artifact there is no parent objets. So, you can give "_no parent object_"
10. Link Type should be specified for artifact and object traces. Possible link types can be DEPENDS_ON, EVOLVED_TO, JUSTIFIES, SATISFIES. For the first aritfact as there are no parent objects you can give "_not-applicable_".

## Graph Visualization:   
Download and install Neo4J following the instructions from Neo4J website. You also need the file _graph_visualization.ipynb_ from _graph_visualization_ directory in this repository.

### Neo4J browser
1. Create Neo4J database and open Neo4J browser.
2. Credentials used to create the database is needed for your Neo4J code. You have to update the credentials at the below statement of the code _graph_visualization.ipynb_.
```
data_base_connection = GraphDatabase.driver(uri = "bolt://localhost:7687", auth=("neo4j", "123456"))
```
3. Neo4J browser displays the graph. The command used to generate the graph is
```
Match (n)
Return n
```
3. However, at the beginining of the experiment there won't be any information to display. Hence no graph is seen.
4. Graph visualization code is in the visualization directory. Before running the Neo4J code, user will be required to clear the graph database. In case if there is any unwanted graph, the necessary command to delete existing graph database is
```
Match (n) 
Detach Delete n.
```
### Neo4J Code
1. The necessary python code to create graph will be opened in the visual studio (VS) and ready to use. The user must run this code to extract the information from the RequirementChain text file and create Neo4J graph.
2. To run the Jupyter notebook code the user has to click the run button at the left of the cell as shown in the Figure 2. <br>

<img src= "/experiment/assets/neo4j_code_snippet.png" width="450" height="80"> <br>
*Figure 2: Portion of python code to create the Neo4J commands.* <br>
<br>
3. Now if you run the below command you should be able to see the requirement graph. 
```
Match (n)
Return n
```

### Citation
Please cite the below paper (under review), if you find benefit or use any part of this repository.. <br>
```
@article{elapolu2025blockchain, 
  title={DART: A Decentralized Application-based Requirement Traceability Framework for Cyber-Physical System Development}, 
  author={Elapolu, Mohan S. R. and Rai, Rahul and Gorsich, David J. and Castanier, Matthew P. }, 
  journal={....},
  volume={....},
  pages={....},
  year={2024}, 
  publisher={...} 
}
```
