pipeline {
    agent {
        // Build and use the Dockerfile from your repo
        dockerfile true
    }

    stages {
        stage('Run Cypress Tests') {
            steps {
                // NodeJS and all npm packages are already installed
                // inside the container by the Dockerfile.
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