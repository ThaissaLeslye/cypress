pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // mesmo nome configurado em "Global Tool Configuration"
    }

    environment {
        NODE_ENV = "qa"
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo 'Limpando workspace...'
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                echo 'Clonando repositório...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Instalando dependências...'
                sh 'npm ci'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo 'Executando testes Cypress com Mochawesome...'
                // gera arquivos JSON de relatório
                sh '''
                    npx cypress run --reporter mochawesome \
                        --reporter-options overwrite=false,html=false,json=true || true
                '''
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                echo 'Gerando relatório HTML a partir dos JSONs...'
                // combina todos os JSONs e gera o HTML final
                sh '''
                    npx mochawesome-merge cypress/reports/*.json > mochareport.json || true
                    npx marge mochareport.json --reportDir mochawesome-report || true
                '''
            }
        }
    }

    post {
        always {
            echo 'Arquivando artefatos...'
            archiveArtifacts artifacts: 'mochawesome-report/**/*', allowEmptyArchive: true
            junit 'cypress/results/*.xml'
        }
        failure {
            echo 'Build falhou. Verifique logs e screenshots.'
        }
    }
}
