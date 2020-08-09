pipeline {
  agent {
    docker { image 'node:latest' }
  }
  stages {
    stage('Install') {
      steps { sh 'npm install' }
    }

    stage('Test') {
      parallel {
        stage('Static code analysis') {
            steps { sh 'npm run-script lint' }
        }
        stage('Unit tests') {
            steps { 
              withEnv (['CHROME_BIN=/usr/bin/google-chrome']) {
                sh 'npm run-script test:no-watch'
              } 
            }
        }
      }
    }

    stage('Build') {
      steps { sh 'npm run-script build' }
    }
  }
}
