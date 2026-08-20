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
                bat '''
                    @echo off
                    echo Installing React and Selenium dependencies...
                    npm install
                '''
            }
        }

        stage('Start React Application') {
            steps {
                bat '''
                    @echo off
                    echo Starting React application...

                    set JENKINS_NODE_COOKIE=dontKillMe
                    set BROWSER=none

                    start "ReactApp" /B cmd /c "npm start"

                    echo Waiting for React application...
                    timeout /t 20 /nobreak
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