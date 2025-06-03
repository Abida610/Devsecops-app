pipeline{
    agent any
    environment {
        // Use system Python or specify exact path
        PYTHON = '/usr/bin/python3'
    }
    stages{
        stage('Checkout'){
            steps{
                checkout scm
        }
        }
        stage('Setup Python') {
            steps {
                sh '''
                    sudo apt-get update -y
                    sudo apt-get install -y python3 python3-pip python3-venv
                    python3 -m pip install --upgrade pip
                '''
            }
        }
        stage('Lint'){
            steps{
              sh '''
                    python3 -m pip install flake8
                    flake8 . --count --show-source --statistics || echo "Linting failed"
                '''
            }
        
}
        
        stage('Build & Test') {
            steps {
                sh 'python3 app.py'
            }
        }

        
    }
}