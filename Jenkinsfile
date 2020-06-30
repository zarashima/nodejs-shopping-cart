pipeline{
    agent any
    environment {
        PATH = "$PATH:/usr/local/bin"
    }
    stages{
        stage("Setup") {
            steps {
                sh 'npm install'
            }
        }
        stage("Smoke Performance Test") {
            steps {
                script {
                    docker.withTool('Docker') {
                        sh 'docker pull loadimpact/k6:latest'
                        sh 'k6 run tests/smoke-tests.js | k6-to-junit k6-reports.xml '
                    }
                }
            }
        }
        stage("Automation Test") {
            steps {
                    git branch: 'master',
                        url: 'https://github.com/zarashima/selenium-test-framework.git'
            }
        }
    }
    post{
        always{
            junit "*.xml"
        }
    }
}