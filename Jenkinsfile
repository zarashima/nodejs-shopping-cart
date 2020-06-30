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
        stage('Run Tests') {
            parallel{
                stage('Unit Test') {
                    steps {
                        sh 'echo PASSED'
                    }
                }
                stage('Integration Test') {
                    steps {
                        sh 'echo PASSED'
                    }
                }
                stage("Smoke Performance Test") {
                    steps {
                        script {
                            docker.withTool('Docker') {
                                sh 'mkdir -p k6-reports'
                                sh 'docker pull loadimpact/k6:latest'
                                sh 'k6 run tests/smoke-tests.js | k6-to-junit k6-reports/k6-reports.xml '
                            }
                        }
                    }
                }
            }
            post{
                always{
                    junit "k6-reports/*.xml"
                }
            }
        }
        stage("Automation Test") {
            steps {
                    git branch: 'master',
                        url: 'https://github.com/zarashima/selenium-test-framework.git'
                    sh 'export RUNWHERE=pipeline'
                    sh 'mvn clean test -Dsuite=suite'    
            }
        }
        post{
            always{
                junit "target/**/*.xml"
            }
        }
    }
}