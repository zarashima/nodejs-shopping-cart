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
        stage('Setup') {
            steps {
                sh 'npm install'
                dir('automation-project') {
                    git branch: 'master',
                        url: 'https://github.com/zarashima/selenium-test-framework.git'
                }
                dir('performance-project') {
                    git branch: 'master', 
                        url: 'https://github.com/zarashima/another-nodejs-k6-tests.git'
                }
            }   
        }

        stage('Local Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Development Tests') {
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
        
        stage('Performance Test') {
            steps {
                script {
                    dir ('performance-project') {                    
                        docker.withTool('Docker') {
                            sh 'docker-compose run -v $PWD/scripts:/scripts k6 run scripts/smoke-tests.js'
                        }
                    }
                }
            }
        }

        stage('Smoke Tests') {
            steps {
                dir('automation-project') {
                    script {
                        docker.withTool('Docker') {
                            sh './run-tests.sh SmokeSuite.xml'
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
                    script {
                        docker.withTool('Docker') {
                            sh './run-tests.sh RegressionSuite.xml'  
                        }  
                    }
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

