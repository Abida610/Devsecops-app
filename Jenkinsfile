pipeline {
    agent any
    environment {
        // Define Docker registry or image name for your app
        DOCKER_IMAGE = "my-app:${env.BUILD_NUMBER}"
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
                // Run Flake8 as in your lint.yml
                sh 'pip install flake8'
                sh 'flake8 --extend-ignore=E999 app.py'
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
                // Build a Docker image for your app.py
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }
'''
        stage('Trivy Scan') {
            steps {
                // Scan the Docker image with Trivy
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image ${DOCKER_IMAGE}'
            }
        }

        stage('ZAP Scan') {
            steps {
                // Run ZAP scan (assumes app.py is a web app accessible after deployment)
                sh 'docker run --network devsecops-net ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t http://k3d:80 -r zap-report.html'
                archiveArtifacts 'zap-report.html'
            }
        }

        stage('Dependency-Track Analysis') {
            steps {
                // Generate SBOM and upload to Dependency-Track (assumes cyclonedx-cli is installed)
                sh 'cyclonedx-py requirements -o bom.xml'
                sh 'curl -X POST http://dependency-track:8080/api/v1/bom -H "Content-Type: multipart/form-data" -F "projectName=my-app" -F "bom=@bom.xml"'
            }
        }

        stage('Deploy to k3d') {
            steps {
                // Deploy to k3d (Kubernetes)
                sh 'kubectl --kubeconfig=/var/lib/rancher/k3s/kubeconfig.yaml apply -f k8s-deployment.yaml'
            }
        }
'''
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