pipeline {
    agent {
        dockerfile true
    }
    tools {
        nodejs 'NodeJS' 
    }

    stages {
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