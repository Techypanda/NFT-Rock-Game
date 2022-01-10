# NFT Rock Game
Submission for https://townhall.hashnode.com/thirdweb-hackathon
## What Is It?
A Cookie Clicker-esque clone but it is about rocks, you mine a rock for a chance of a gem/trash. Using the money earned you can either make it easier to mine rocks or you can purchase NFTs, obviously there is going to be cheating so I can't think of a realistic way to make this a 'real' game, but its a neat idea.
## How To Build
This web application was built using docker, so all you need is docker, docker-compose and if you want easy setup make.  
  
### Build & Run Frontend
```sh
make build
make run-frontend
```  
  
### Build & Run API
```sh
make build
make run-api
```  
  
### Build & Run Database
```sh
make run-db
```  
  
### Build And Run Entire Application
```sh
make build
make run
```