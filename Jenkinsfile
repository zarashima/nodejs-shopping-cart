def baseUrl = "";

pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr:'10')) 
    }

    environment {
        PATH = "$PATH:/usr/local/bin"
    }

    stages {

        stage('Local Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            parallel{
                stage('Unit Tests') {
                    steps {
                        sh 'echo PASSED'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'echo PASSED'
                    }
                }
                stage('API Tests') {
                    steps {
                        sh 'echo PASSED'
                    }
                }
            }
        }

        stage('Local Deploy') {
            steps {
                sh 'echo Local environment deployed'
                script {
                    baseUrl = "http://localhost:3000"
                }
            }
        }    
        
        stage('Smoke Performance Test') {
            steps {
                script {
                    docker.withTool('Docker') {
                            sh 'mkdir -p k6-reports'
                            sh 'docker pull loadimpact/k6:latest'
                            sh 'k6 run tests/smoke-tests.js | k6-to-junit k6-reports/k6-reports.xml'
                    }
                }
            }
        }

        stage('Smoke Tests') {
            steps {
                dir('automation-project') {
                    git branch: 'master',
                        url: 'https://github.com/zarashima/selenium-test-framework.git'
                    script {
                        docker.withTool('Docker') {
                            sh './run-tests.sh'  
                        }  
                    }
                }
            }
        }

        stage('Staging Deploy') {
            steps {
                echo 'Deployed to staging'
            }
        }

        stage('Regression Test') {
            steps {
                dir('automation-project') {

                }
            }
        }
    }

    post {
            always{
                junit "k6-reports/*.xml"
                junit "automation-project/results/**/*.xml"
            }
    }
}
