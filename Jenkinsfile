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
        sh 'npx lighthouse-ci https://www.example.com --jsonReport --report=.'
        lighthouseReport('./report.json')
      }
    }

    stage('Test') {
      agent {
        docker { 
          image 'browserless/chrome'
        }
      }
      parallel {
        stage('Static code analysis') {
            steps { sh 'npm run-script lint' }
        }
        stage('Unit tests') {
            steps { 
              sh 'npm run-script test'
            }
        }
      }
    }

    stage('Build') {
      steps { sh 'npm run-script build' }
    }
  }
}
