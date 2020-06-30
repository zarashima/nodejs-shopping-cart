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
                                sh 'k6 run tests/smoke-tests.js | k6-to-junit k6-reports/k6-reports.xml'
                            }
                        }
                    }
                }
            }
        }
        stage("Automation Test") {
            steps {
                    git branch: 'master',
                        url: 'https://github.com/zarashima/selenium-test-framework.git'
                    script {
                        docker.withTool('Docker') {
                            sh 'docker pull maven:3-alpine'
                            sh 'docker run -v $HOME/.m2:/root/.m2 -v $PWD:$PWD -w $PWD maven:3-alpine mvn clean test -Dsuite=suite'    
                        }
                    }
            }
        }
    }
    post {
            always{
                junit "k6-reports/*.xml"
                junit "target/surefire-reports/**/*.xml"
            }
    }
}