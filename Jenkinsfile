pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    registry = "registry.raspi.timkausemann.de"
    registryUser = "tim.kausemann"
    registryPass = "tim.kausemann"
    imageName = "bloatstream-int"
  }
  stages {
    stage('Build') {
      steps {
        script {
          dir
          docker.build( registry + '/' + imageName, 'bloatstream' )
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

