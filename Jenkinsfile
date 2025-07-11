pipeline {
  agent { label 'jdk17' }
  options {
    disableConcurrentBuilds()
  }
  environment {
    buildSet = '""'
    project = '""'
    dockerpackage = 'calendar-ui'
  }
  triggers {
    pollSCM('H/5 * * * *')
  }
  stages{
    stage('Preparation') {
      steps {
        sh "docker login -u ${ARTIFACTORY_DOCKER_USER} -p ${ARTIFACTORY_DOCKER_PWD} ${ARTIFACTORY_DOCKER_URL}"
        script {
          dir("${buildSet}/${project}") {
            branchformatted="${GIT_BRANCH}".toUpperCase().replaceAll(/[^A-Z]/, ".")
            version = "${branchformatted}-${BUILD_ID}."+"${env.GIT_COMMIT}".substring(0,5)
            latestversion = "${branchformatted}-latest"
            builderror = ""
            sh "echo ${version}/${latestversion}"
          }
        }
      }
    }
    stage('Build') {
      steps {
        timeout(20) {
          script {
             dir("") {
               builderror = "${builderror}" + dockerBuildAndPush("./Dockerfile", "calendar-ui")
             }
          }
        }
      }
    }
    stage('Errors handling') {
      steps {
        script {
          sh "if [ \"${builderror}\" != \"\" ]; then echo \"ERROR BUILDING FOLLOWING IMAGES: ${builderror}\"; exit -1; fi"
        }
      }
    }
  }
}

def dockerBuildAndPush(dockerfile, dockerepo ) {
    echo "+ dockerBuildAndPush( ${dockerfile}, ${dockerepo}) been called"
    sh "export HTTPS_PROXY=${HTTPS_PROXY}"
    sh "curl -O https://api.nuget.org/v3/index.json"
    sh "echo ${version}/${latestversion}"
    try {
      sh "docker build . --no-cache --file ${dockerfile} ${DOCKER_BUILD_PROXY_OPTIONS} -t ${ARTIFACTORY_DOCKER_URL}/${dockerpackage}/${dockerepo}:${version}"
      sh "curl -O https://api.nuget.org/v3/index.json"
      sh "docker tag ${ARTIFACTORY_DOCKER_URL}/${dockerpackage}/${dockerepo}:${version} ${ARTIFACTORY_DOCKER_URL}/${dockerpackage}/${dockerepo}:${latestversion}"
      sh "docker push ${ARTIFACTORY_DOCKER_URL}/${dockerpackage}/${dockerepo}:${version}"
      sh "docker push ${ARTIFACTORY_DOCKER_URL}/${dockerpackage}/${dockerepo}:${latestversion}"
      return ''
    } catch (err) {
      echo "ERROR BUILDING ${dockerepo}!"
      return " ${dockerepo}"
    }
}
