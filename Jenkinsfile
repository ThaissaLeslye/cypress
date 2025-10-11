pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Deve coincidir com o nome configurado em "Global Tool Configuration"
    }

    environment {
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
        NODE_ENV = "qa"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo 'Cleaning workspace...'
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo 'Running Cypress tests...'
                // Executa com relatório e trata erros sem abortar o pipeline
                sh '''
                    npx cypress run || echo "Cypress tests failed"
                '''
            }
        }

        stage('Generate Reports') {
            steps {
                echo 'Generating reports...'
                sh '''
                    npx mochawesome-merge cypress/reports/*.json > mochareport.json || true
                    npx marge mochareport.json --reportDir cypress/reports/html || true
                '''
            }
        }
    }

    post {
        always {
            echo 'Archiving reports...'
            archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true
            junit 'cypress/results/*.xml'
        }
        failure {
            echo 'Build failed. Check Cypress logs and screenshots.'
        }
    }
}