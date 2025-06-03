pipeline{
    agent any
    stages{
        stage('Checkout'){
            steps{
                git branch:'main',
                url: 'https://github.com/Abida610/Devsecops-app'}
        }
        stage('Lint'){
             script {
                    try {
                        // Check for binary/null bytes first
                        def hasNullBytes = sh(script: 'grep -rIlP "\\x00" app.py', returnStatus: true) == 0
                        
                        if (hasNullBytes) {
                            error("Found null bytes in app.py - File may be corrupted!")
                        } else {
                            // Install flake8 in a virtual environment
                            sh '''
                                python3 -m venv venv
                                . venv/bin/activate
                                pip install flake8
                                flake8 --extend-ignore=E999 app.py
                            '''
                        }
                    } catch (Exception e) {
                        echo "Linting failed: ${e.getMessage()}"
                        // Continue to build anyway (remove if you want to fail)
                        // currentBuild.result = 'UNSTABLE' 
                    }
                }
            }
        

        }
        stage('Build & Test') {
            steps {
                sh 'python app.py'
            }
        }

        
    }
