pipeline{
    agent none
    stages{
        stage("Setup") {
            agent {
                docker { image 'node:7-alpine }
            }
            steps {
                sh 'npm install'
            }
        }
        stage("Performance Test") {
            agent {
                docker { image 'loadimpact/k6:latest' }
            }
            steps {
                sh 'k6 run --vus 10 tests/smoke-tests.js'
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