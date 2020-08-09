pipeline {
  agent {
    docker { image 'node:latest' }
  }
  stages {
    stage('Install') {
      steps { sh 'npm install' }
    }
    stage('LightHouse') {
      steps {
        sh 'npx lighthouse-ci https://www.google.com --jsonReport --report=.'
        lighthouseReport('./report.json')
      }
    }

    stage('Test') {
      parallel {
        stage('Static code analysis') {
          steps { sh 'npm run-script lint' }
        }
        stage('Unit tests') {
          agent {
            docker { 
              image 'browserless/chrome'
            }
          }
          steps { sh 'npm run-script test' }
        }
      }
    }

    stage('Build') {
      steps { sh 'npm run-script build' }
    }
  }
}
