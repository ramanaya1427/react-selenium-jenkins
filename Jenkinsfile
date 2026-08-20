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
                powershell '''
                    Write-Host "Starting React application..."

                    $workspace = $env:WORKSPACE

                    Start-Process `
                        -FilePath "cmd.exe" `
                        -ArgumentList "/c npm start" `
                        -WorkingDirectory $workspace `
                        -WindowStyle Hidden

                    Write-Host "Waiting for React application..."

                    $ready = $false

                    for ($i = 1; $i -le 30; $i++) {
                        Start-Sleep -Seconds 2

                        try {
                            $response = Invoke-WebRequest `
                                -Uri "http://localhost:3000" `
                                -UseBasicParsing `
                                -TimeoutSec 2

                            if ($response.StatusCode -eq 200) {
                                $ready = $true
                                Write-Host "React application is running!"
                                break
                            }
                        }
                        catch {
                            Write-Host "Waiting..."
                        }
                    }

                    if (-not $ready) {
                        Write-Error "React application did not start on port 3000."
                        exit 1
                    }
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