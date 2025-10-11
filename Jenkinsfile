pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // O mesmo nome configurado na "Global Tool Configuration"
    }

    environment {
        CYPRESS_REPORT_DIR = 'cypress/reports'
    }

    stages {
        stage('Limpeza e Preparação') { // 1. UM ESTÁGIO DEDICADO PARA LIMPEZA
            steps {
                echo 'Limpando o workspace antes de começar...'
                
                // O COMANDO MÁGICO PARA LIMPAR TUDO:
                cleanWs() 
            }
        }
        stage('Checkout') {
            steps {
                // Clona o repositório do Git
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Executa o npm install para baixar as dependências do projeto
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                // Remove a pasta de relatórios antes de rodar os testes
                sh 'rm -rf cypress/reports'
                // Executa os testes definidos no seu package.json
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    sh 'npm test'
                }
            }
        }
    }

    post {
        always {
            // Este bloco é executado sempre, independentemente do resultado do build
            echo 'Archiving reports...'
            archiveArtifacts artifacts: "${CYPRESS_REPORT_DIR}/*.html", allowEmptyArchive: true
            archiveArtifacts artifacts: "${CYPRESS_REPORT_DIR}/*.json", allowEmptyArchive: true
            archiveArtifacts artifacts: 'test_summary.csv', allowEmptyArchive: true
        }
    }
}