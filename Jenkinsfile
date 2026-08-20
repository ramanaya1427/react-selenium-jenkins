stage('Start React Application') {
    steps {
        powershell '''
            Write-Host "Starting React application..."

            $workspace = $env:WORKSPACE
            $logFile = Join-Path $workspace "react.log"
            $errorLogFile = Join-Path $workspace "react-error.log"

            if (Test-Path $logFile) {
                Remove-Item $logFile -Force
            }

            if (Test-Path $errorLogFile) {
                Remove-Item $errorLogFile -Force
            }

            $env:BROWSER = "none"

            Start-Process `
                -FilePath "npm.cmd" `
                -ArgumentList "start" `
                -WorkingDirectory $workspace `
                -RedirectStandardOutput $logFile `
                -RedirectStandardError $errorLogFile `
                -WindowStyle Hidden

            Write-Host "Waiting for React application..."

            $ready = $false

            for ($i = 1; $i -le 30; $i++) {

                Start-Sleep -Seconds 2

                if (Test-Path $logFile) {
                    Write-Host "--- React output ---"
                    Get-Content $logFile -Tail 10
                }

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

                Write-Host "========== React Error Log =========="

                if (Test-Path $errorLogFile) {
                    Get-Content $errorLogFile
                }

                Write-Host "========== React Output Log =========="

                if (Test-Path $logFile) {
                    Get-Content $logFile
                }

                Write-Error "React application did not start on port 3000."
                exit 1
            }
        '''
    }
}