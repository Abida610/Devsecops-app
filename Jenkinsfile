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
                     if command -v apt-get >/dev/null; then
                        apt-get update -qq && apt-get install -y python3 python3-pip python3-venv
                    elif command -v apk >/dev/null; then
                        apk add python3 py3-pip python3-dev
                    fi
                    
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