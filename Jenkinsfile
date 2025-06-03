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