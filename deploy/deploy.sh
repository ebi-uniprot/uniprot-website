#!/usr/bin/env bash

DC=$1
if [ "$DC" != "HH" ] && [ "$DC" != "HX" ]; then
  echo "DC variable not being defined as HH or HX."
  echo "***${DC}***"
  exit 1
fi

echo "--- Deploying ${DC} ---"

K8S_CERTIFICATE=${DC}_K8S_CERTIFICATE
K8S_URL=${DC}_K8S_URL
K8S_USER_TOKEN=${DC}_K8S_USER_TOKEN

mkdir -p ~/.kube
sed "s~__K8S_CERTIFICATE__~${!K8S_CERTIFICATE}~; s~__K8S_URL__~${!K8S_URL}~; s~__K8S_USER_TOKEN__~${!K8S_USER_TOKEN}~" deploy/wp-config-template.yml > ~/.kube/config
chmod 700 ~/.kube/config

kubectl cluster-info || { echo 'Cannot reach cluster' ; exit 1; } 

kubectl config use-context team-admin-wp-webadmin-02
kubectl config set-context --current --namespace=uniprot-front-end
printf "$(kubectl create secret docker-registry gitlab-registry --docker-server=$CI_REGISTRY --docker-username=$CI_DEPLOY_USER --docker-password=$CI_DEPLOY_PASSWORD --docker-email=$GITLAB_USER_EMAIL -o yaml --dry-run=client)" | kubectl apply -f -
kubectl apply -f deploy/k8s_deploy.yml
kubectl rollout restart statefulset.apps/uniprot-website-client
kubectl rollout status statefulset.apps/uniprot-website-client || { echo 'Deployment failed!' ; exit 1; }

echo "Deployment succeeded!"
kubectl get all

NODE_PORT=$(kubectl get services -o=jsonpath='{.items[0].spec.ports[0].nodePort}')
NODE_HOST_NAME=$(kubectl get nodes -o=jsonpath='{.items[0].status.addresses[?(@.type=="Hostname")].address}')
echo $'\n\n'${DC} deployed. Internally avaialable at: http://$NODE_HOST_NAME:$NODE_PORT