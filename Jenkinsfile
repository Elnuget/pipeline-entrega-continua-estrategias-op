pipeline {
    agent {
        docker {
            image 'node:20-alpine'
            args '-v /var/cache/npm:/root/.npm -v /tmp:/tmp'
        }
    }
    environment {
        PROJECT_NAME    = 'university-core-api'
        TELEGRAM_TOKEN  = credentials('telegram-bot-token')
        CHAT_ID         = credentials('telegram-chat-id')
        SONAR_TOKEN     = credentials('sonarqube-api-token')
        CYPRESS_CACHE_FOLDER = '/root/.cache/Cypress'
    }
    options {
        timeout(time: 25, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '15'))
        disableConcurrentBuilds()
    }
    stages {
        stage('Checkout & Cache Setup') {
            steps {
                echo "Clonando repositorio y restaurando capas de cache..."
                checkout scm
                sh 'npm ci --prefer-offline --no-audit'
            }
        }
        stage('Parallel Quality & Verification') {
            parallel {
                stage('Linting & Style (ESLint)') {
                    steps {
                        echo "Ejecutando analisis de estilo y sintaxis con ESLint..."
                        sh 'npm run lint -- --format junit -o reports/junit/eslint.xml'
                    }
                }
                stage('Type Check & Compilation') {
                    steps {
                        echo "Compilacion estricta con TypeScript..."
                        sh 'npm run build'
                    }
                }
                stage('Unit Testing & Coverage') {
                    steps {
                        echo "Ejecucion de pruebas unitarias Jest..."
                        sh 'npm run test:unit -- --ci --coverage --reporters=default --reporters=jest-junit'
                    }
                }
            }
        }
        stage('E2E Functional Tests (Cypress)') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'main'
                }
            }
            steps {
                echo "Ejecutando pruebas E2E automatizadas sobre API con Cypress..."
                sh 'npm run test:e2e:headless'
            }
        }
        stage('Static Security & SonarQube Gate') {
            when {
                branch 'develop'
            }
            steps {
                echo "Analizando calidad tecnica y vulnerabilidades con SonarQube..."
                sh '''
                    npm run sonar:scan -- \
                    -Dsonar.projectKey=${PROJECT_NAME} \
                    -Dsonar.sources=src \
                    -Dsonar.tests=tests \
                    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                    -Dsonar.login=${SONAR_TOKEN}
                '''
            }
        }
        stage('Artifact Packaging') {
            when {
                branch 'main'
            }
            steps {
                echo "Generando artefacto distribuible para despliegue..."
                sh 'tar -czf dist-${BUILD_NUMBER}.tar.gz dist/ package.json'
                archiveArtifacts artifacts: 'dist-*.tar.gz', fingerprint: true
            }
        }
    }
    post {
        always {
            echo "Recopilando reportes y liberando espacio..."
            junit allowEmptyResults: true, testResults: 'reports/junit/*.xml'
            cleanWs notFailBuild: true
        }
        success {
            echo "Pipeline finalizado con exito. Enviando notificacion..."
            sh '''
                curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage" \
                -d "chat_id=${CHAT_ID}" \
                -d "parse_mode=Markdown" \
                -d "text=[EXITO] *UDLA CI/CD*: Compilacion *#${BUILD_NUMBER}* exitosa en rama \`${BRANCH_NAME}\`. Artefacto listo."
            '''
        }
        failure {
            echo "Pipeline fallido. Enviando alerta critica..."
            sh '''
                curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage" \
                -d "chat_id=${CHAT_ID}" \
                -d "parse_mode=Markdown" \
                -d "text=[ALERTA] *ALERTA CI/CD*: Compilacion *#${BUILD_NUMBER}* fallida en rama \`${BRANCH_NAME}\`. Revisa los logs en Jenkins."
            '''
        }
    }
}
