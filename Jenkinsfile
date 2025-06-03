pipeline{
    agent {
        docker {
            image 'python:3.13-slim'  // Pre-installs Python/pip
            args '-v /tmp:/tmp'
        }
    }
    stages{
        stage('Checkout'){
            steps{
                git branch:'main',
                url: 'https://github.com/Abida610/Devsecops-app'}
        }
        stage('Lint'){
            steps {
                    sh 'pip3 install flake8'
                    sh 'flake8 --extend-ignore=E999 app.py'

        }

        }
        stage('Build & Test') {
            steps {
                sh 'python app.py'
            }
        }

        
    }
}