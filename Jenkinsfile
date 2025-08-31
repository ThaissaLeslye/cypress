pipeline {
    agent {
        docker { image 'cypress/included:12.17.3' }
    }

    stages {
        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run --reporter junit --reporter-options "mochaFile=cypress/results/results-[hash].xml,toConsole=true"'
            }
        }
    }

    post {
        always {
            // Garante que junit rode dentro do workspace
            node {
                junit 'cypress/results/*.xml'
            }
        }
    }
}
