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
sed "s~__K8S_CERTIFICATE__~${K8S_CERTIFICATE}~; s~__K8S_URL__~${K8S_URL}~; s~__K8S_USER_TOKEN__~${K8S_USER_TOKEN}~" wp-config-template.yml > ~/.kube/config
chmod 700 ~/.kube/config
kubectl config use-context team-admin-wp-webadmin-02
kubectl config set-context --current --namespace=uniprot-front-end
printf "$(kubectl create secret docker-registry gitlab-registry --docker-server=$CI_REGISTRY --docker-username=$CI_DEPLOY_USER --docker-password=$CI_DEPLOY_PASSWORD --docker-email=$GITLAB_USER_EMAIL -o yaml --dry-run=client)" | kubectl apply -f -
kubectl get secrets gitlab-registry -o yaml
kubectl apply -f k8s_deploy.yml
kubectl rollout restart statefulset.apps/uniprot-website-client
kubectl get all
kubectl get nodes

if [ $(kubectl get pods -o=jsonpath="{.items[*].status.phase}") != "Running" ]; then
    echo "Error: deployment of ${DC} unsuccessful, exiting"
    exit 1
fi
