pipeline {
    agent any

    stages {
        stage('Run Cypress') {
            steps {
                script {
                    docker.image('cypress/included:12.17.3').inside {
                        sh 'npx cypress run --reporter junit --reporter-options "mochaFile=cypress/results/results-[hash].xml,toConsole=true"'
                    }
                }
            }
        }
    }

    post {
        always {
            junit 'cypress/results/*.xml'
        }
    }
}
