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
        stage("Performance Test") {
            steps {
                script {
                    docker.withTool('Docker') {
                        sh 'docker pull loadimpact/k6:latest'
                    }
                }
            }
        }
    }
    post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}