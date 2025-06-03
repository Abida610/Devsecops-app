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
                script {
                    sh '''
                        apt-get update -y
                        apt-get install -y python3 python3-pip
                        pip3 install flake8
                        flake8 --extend-ignore=E999 app.py
                    '''
        }

        }}
        stage('Build & Test') {
            steps {
                sh 'python app.py'
            }
        }

        
    }
}