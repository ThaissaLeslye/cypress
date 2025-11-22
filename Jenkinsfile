pipeline {
    agent any

    tools {
        nodejs 'NodeJS' 
    }
    stages {
        stage ('Checkout') {
            steps {
                checkout scm
            }  
        }
        stage('Instala Dependencias') {
            steps {
                // Entra na pasta correta e instala
                sh 'npm ci'
            }
        }

        stage('Limpa Relatorio') {
            steps {
                // Limpa TUDO na pasta de destino antes de começar
                sh 'rm -Rf cypress/results || true'
            }
        }

        stage('Roda Testes') {
            steps {
                retry(1) {
                    timeout(time: 15, unit: 'MINUTES') {
                        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                            // Roda o teste. Se falhar, o catchError deixa passar para o report
                            sh 'npm cypress'
                        }
                    }
                }
            }
        }

        stage('Gera Relatorio') {
            steps {
                // Roda o script 'report' configurado no package.json (merge + generate)
                sh 'npm run report'
            }
        }

        stage('Upload para API') {
            steps {
                script {
                    // Verifica se o arquivo existe antes de tentar enviar
                    if (fileExists('cypress/results/full_report.json')) {
                        echo "🚀 Enviando relatório para a API..."
                        
                        // O IP deve ser onde seu Node.js está rodando (cuidado com localhost dentro do Docker)
                        // O '@' antes do caminho do arquivo é OBRIGATÓRIO
                        sh '''
                          curl -v -X POST \
                          -H "Content-Type: application/json" \
                          -d @cypress/results/full_report.json \
                          http://192.168.0.175:5029/upload
                        '''
                    } else {
                        echo "⚠️ Arquivo de relatório não encontrado. Pulo o upload."
                    }
                }
            }
        }
    }
}