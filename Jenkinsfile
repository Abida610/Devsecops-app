pipeline{
    agent any
    stages{
        stage('Checkout'){
            steps{
                checkout scm
        }
        }
        stage('Setup Python') {
            steps {
                sh '''
                    python3 -m venv venv
                    . venv/bin/activate
                    
                    # Upgrade pip inside venv
                    pip install --upgrade pip
                    
                    # Install requirements
                    pip install flake8
                '''
            }
        }
        stage('Lint'){
            steps{
              sh '''
                    . venv/bin/activate
                    flake8 . --count --show-source --statistics
                '''
            }
        
}
        
        stage('Build & Test') {
            steps {
                sh '''
                . venv/bin/activate
                python app.py
                '''

            }
        }

        
    }
}