pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // O mesmo nome configurado na "Global Tool Configuration"
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
                // Executa os testes definidos no seu package.json
                sh 'npm test'
            }
        }
    }

    post {
        always {
            // arquiva os relatórios como artefato
            archiveArtifacts artifacts: 'mochawesome-report/*.html', allowEmptyArchive: true
        }
    }
}