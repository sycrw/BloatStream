node{

}

pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    registry = "registry.raspi.timkausemann.de"
    registryUser = 
    registryPass = 
    imageName = "bloatstream-int"
  }
  stages {
    //log the project structure
    stage('Show Project Structure') {
      steps {
        sh 'pwd'
        sh 'ls'
      }
    }
    stage('Checkout to int') {
      steps {
        sh 'git checkout int'
      }
    }
    stage('Show Project Structure after checkout') {
      steps {
        sh 'pwd'
        sh 'ls'
      }
    }
    stage('Build') {
      steps {
        script {
          docker.build( registry + '/' + imageName, '.' )
        }
      }
    }
    stage('Login') {
      steps {
        sh 'docker login -u ' + registryUser + ' -p ' + registryPass + ' ' + registry
      }
    }
    stage('Push') {
      steps {
        script {
          docker.withRegistry( '', registryUser ) {
            docker.image( registry + '/' + imageName ).push()
          }
        }
      }
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}

