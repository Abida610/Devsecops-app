pipeline{
    agent any
    stages{
        stage('Checkout'){
            steps{
                git branch:'main',
                url: 'https://github.com/Abida610/Devsecops-app'}
        }
        stage('Lint'){
            steps {
                sh 'pip install flake8'
                sh 'flake8 . --count --show-source --statistics'
            }

        }
        stage('Build & Test') {
            steps {
                sh 'python app.py'
            }
        }

        
    }
}