pipeline {
    agent any

    stages {

        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Start React Application') {
            steps {
                bat '''
                    @echo off
                    echo Starting React application...

                    set BROWSER=none
                    start "ReactApp" /B cmd /c "npm start"

                    echo Waiting for React application...
                    timeout /t 20 /nobreak

                    echo Checking React application...
                    curl -I http://localhost:3000

                    if errorlevel 1 (
                        echo React application failed to start.
                        exit /b 1
                    )

                    echo React application is running.
                '''
            }
        }

        stage('Execute Selenium Tests') {
            steps {
                bat '''
                    @echo off
                    echo Running Selenium UI tests...
                    npx mocha src/test/selenium.test.js
                '''
            }
        }
    }

    post {
        always {
            echo 'React Selenium pipeline completed.'
        }
    }
}