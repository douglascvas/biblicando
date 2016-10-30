# Biblicando

## Cloning the repo

The project is splitted into git submodules. Therefore, whenever cloning the repo, remember to do it recursively:
```
git clone --recursive https://github.com/douglascvas/biblicando.git
```

## Preparing the environment

To prepare the environment to run biblicando, you need a mongodb instance and a redis instance.
To make the process of preparing the environment easier, an ansible script is provided to bootstrap docker images with those dependencies.
The ansible script also installs jenkins and docker-engine if you do not tell it to do otherwise.

#### How to run
 
Make sure you have ansible installed.

 ```
 sudo apt-get install ansible
 ```
 
 Then run the shell script
 
 ```
 cd deployment
 bash ./prepareEnvironment.sh
 ```
 
 The shell script will ask you to chose the environment. Choose `local`.
 Then type if you want to install jenkins or docker. Just type `n` if you already have them installed in your computer.
 
## Starting biblicando

Make sure you have nodejs and gulp-cli installed

In the project root type
```
npm install
```

After finished, you can start the application in development mode by running
```
gulp dev
```

This will turn on the watcher for both frontend and backend subprojects, and start the frontend server, so it can serve the files to access in the browser.
To run the backend just type
```
node backend/build/main/index.js
```

or if you don't intend to debug it, you can also start the application with gulp
```
gulp be-start
```

Now you can access the application in your browser with url `http://localhost:3010`