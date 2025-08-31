pipeline {
    agent any
    tools {
        nodejs 'NodeJS' 
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run'
            }
        }
    }
    post {
        always {
            junit 'cypress/results/*.xml'
        }
    }
}