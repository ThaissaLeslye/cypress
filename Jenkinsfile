pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // A pipeline multibranch já faz o checkout automaticamente
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run --reporter junit --reporter-options "mochaFile=cypress/results/my-report-[hash].xml,toConsole=true"'
            }
        }
    }
}