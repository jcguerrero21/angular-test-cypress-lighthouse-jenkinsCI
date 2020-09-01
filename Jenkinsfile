pipeline {
    agent {
        docker {
            image 'cypress/base:12.16.1'
            args '-e HOME=/tmp -e NPM_CONFIG_PREFIX=/tmp/.npm'
        }
    }
    stages {
        stage('NPM INSTALL') {
            steps {
                sh 'npm install'
                sh 'npm ci'
            }
        }
        stage('QA Cypress') {
            steps {
                withEnv (['CHROME_BIN=/usr/bin/google-chrome']) {
                    sh 'npm run build:prod'
                    sh 'npm run prereport'
                    sh 'npm run ci:cy-run'
                }
            }
        }
        stage('Test') {
            agent {
                docker {
                    image 'browserless/chrome'
                }
            }
            steps {
                sh 'npm run test'
            }
        }
        stage('Lighthouse') {
            agent {
                docker {
                    image 'browserless/chrome'
                }
            }
            steps {
                sh 'npm run build:prod'
                sh 'npm run ci:lighthouse' 
            }
            post {
                always {
                    publishHTML (target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: '.',
                        reportFiles: 'lighthouse-report.html',
                        reportName: "Lighthouse"
                    ])
                }       
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}