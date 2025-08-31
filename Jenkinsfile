pipeline {
    agent any

    stages {
        stage('Run Cypress Tests') {
            agent {
                docker { image 'cypress/included:12.17.3' }
            }
            steps {
                sh 'npx cypress run --reporter junit --reporter-options "mochaFile=cypress/results/results-[hash].xml,toConsole=true"'
            }
            post {
                always {
                    junit 'cypress/results/*.xml'
                }
            }
        }
    }
}
