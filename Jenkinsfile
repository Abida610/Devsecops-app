pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "3tier-app:${env.BUILD_NUMBER}"
    }
    stages {
        stage('Checkout') {
            steps {
                // Clone the repository (already done by Jenkins, but explicit for clarity)
                git url: 'https://github.com/Abida610/Devsecops-app.git', branch: 'main'
            }
        }

        stage('Lint') {
            steps {
        // Run lint for backend inside a Node.js container
                sh '''
                    docker run --rm -v $(pwd)/backend:/app -w /app node:18-slim sh -c "npm install && npm run lint"
                '''
                // Run lint for frontend inside a Node.js container
                sh '''
                    docker run --rm -v $(pwd)/frontend:/app -w /app node:18-slim sh -c "npm install && npm run lint"
                '''
    }
        }

        stage('SonarQSB Analysis') {
            steps {
                // Run SonarQube analysis (assumes SonarQube Scanner plugin is installed)
                withSonarQubeEnv('SonarQube') {
                    sh 'sonar-scanner -Dsonar.projectKey=my-app -Dsonar.sources=. -Dsonar.host.url=http://sonarqube:9000 -Dsonar.login=sqa_63025a1e346206f1c0ddca766ea7e54fe7c51f80'}
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('backend') {
                // Build a Docker image for your app.py
                    sh 'docker build -t ${DOCKER_IMAGE} .'
            }}
        }

        stage('Monitor with Prometheus') {
            steps {
                // Ensure Prometheus is scraping your app (already set up for Jenkins; add your app if needed)
                echo "Prometheus is scraping Jenkins at jenkins:8080. Add your app endpoint to prometheus.yml if needed."
            }
        }
    }
    post {
        always {
            // Archive reports or clean up
            archiveArtifacts artifacts: '*.html, *.xml', allowEmptyArchive: true
        }
    }
}