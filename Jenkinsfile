pipeline {
    agent any

    tools {
        nodejs 'NodeJS' 
    }

    environment {
        CYPRESS_RESULTS_DIR = 'cypress/results'
    }

    stages {
        stage('Limpeza e Preparação') { 
            steps {
                echo 'Limpando o workspace...'
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
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh "rm -rf ${CYPRESS_RESULTS_DIR}"
                
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh 'npm test'
                }
            }
        }
    }

    post {
        always {
            echo 'Processando resultados JUnit...'
            
            // 1. Gera o relatório (OBRIGATÓRIO RODAR ANTES DO CURL)
            junit "${CYPRESS_RESULTS_DIR}/*.xml"
            
            archiveArtifacts artifacts: "${CYPRESS_RESULTS_DIR}/*.xml", allowEmptyArchive: true

            // 2. Chama sua API C# para salvar no banco
            echo 'Sincronizando com o Banco de Dados...'
            
            // ATENÇÃO: Troque "SEU_IP" pelo IP da sua máquina (ex: 192.168.0.15)
            // Troque "PORTA" pela porta onde seu .NET está rodando (ex: 5000 ou 7153)
            // Se usar "localhost" aqui dentro, o Jenkins pode não achar sua API se estiver em Docker.
            sh "curl -X POST \"http://host.docker.internal:5029/api/jenkins/sincronizar\""
        }
    }
}