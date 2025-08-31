pipeline {
    agent {
        // Usa a imagem oficial do Cypress que já contém tudo.
        docker { image 'cypress/included:12.17.3' }
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // O Jenkins monta o código-fonte automaticamente.
                // Só precisamos instalar as dependências do nosso projeto (npm).
                sh 'npm ci' // 'npm ci' é mais rápido e seguro para CI do que 'npm install'
            }
        }
        stage('Run Cypress Tests') {
            steps {
                // A imagem já tem o Cypress, então o comando npx vai funcionar.
                sh 'npx cypress run'
            }
        }
    }
    post {
        always {
            // Coleta os resultados dos testes para exibir no Jenkins.
            junit 'cypress/results/*.xml'
        }
    }
}