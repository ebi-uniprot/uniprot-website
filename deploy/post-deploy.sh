#!/usr/bin/env bash
kubectl rollout status statefulset.apps/uniprot-website-dev || { echo 'Deployment failed!' ; exit 1; }
echo "Deployment succeeded!"
NODE_PORT=$(kubectl get services -o=jsonpath='{.items[?(@.metadata.name=="uniprot-website-dev")].spec.ports[0].nodePort}')
NODE_HOST_NAME=$(kubectl get nodes -o=jsonpath='{.items[0].status.addresses[?(@.type=="Hostname")].address}')
echo $'\n\n'$Internally avaialable at: http://$NODE_HOST_NAME:$NODE_PORT