pipeline {
    agent any

    tools {
        nodejs 'NodeJS' 
    }

    environment {
        // AJUSTE: Caminho onde configuramos o mocha-junit-reporter para salvar os XMLs
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
                sh 'npm ci' // 'npm ci' é mais rápido e seguro para CI do que 'npm install'
            }
        }

        stage('Test') {
            steps {
                // Limpa resultados antigos para não misturar builds
                sh "rm -rf ${CYPRESS_RESULTS_DIR}"
                
                // AJUSTE: buildResult 'UNSTABLE' deixa o job Amarelo se testes falharem,
                // mas garante que o passo 'post' rode para ler os resultados.
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    // Certifique-se que o script "test" no package.json executa "cypress run"
                    sh 'npm test'
                }
            }
        }
    }

    post {
        always {
            echo 'Processando resultados JUnit...'
            
            // O PASSO MAIS IMPORTANTE:
            // Lê os XMLs, gera os gráficos no Jenkins e disponibiliza os dados na API.
            junit "${CYPRESS_RESULTS_DIR}/*.xml"
            
            // Opcional: Se quiser guardar os XMLs brutos para download manual também
            archiveArtifacts artifacts: "${CYPRESS_RESULTS_DIR}/*.xml", allowEmptyArchive: true
        }
    }
}