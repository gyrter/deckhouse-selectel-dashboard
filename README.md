# Dashboard Auth

Авторизация в Deckhouse K8S dashboard

**HINT** Не забывайте сменить переменные на верные в `values.yaml` и `secret-values.yaml`. Это домены, токены, пароли для доступа в Registry и к K8S dashboars

## Getting started

Приложение поддерживает несколько пользователей. Пример создания юзера dashboard с root-правами

Создание токена юзера

```
export ACCOUNT_NAME=dashboard
kubectl -n kube-system create serviceaccount ${ACCOUNT_NAME}
kubectl create clusterrolebinding ${ACCOUNT_NAME} --clusterrole=cluster-admin --serviceaccount=kube-system:${ACCOUNT_NAME}
kubectl -n kube-system create token ${ACCOUNT_NAME}
```

Создание kubeconfig. Это действие обновит `${HOME}/.kube/config`. Эти действия делаем после предыдущих команд.
Для создания конфига нам потребуется сертификат и IP API server. Всё это можно сказать из административной панели Selectel.

```
export CLUSTER=selectel
export CONTEXT=dev
export CLUSTER_API=https://<api address>
mkdir -p ${HOME}/.kube/certs/${CONTEXT}-${CLUSTER}/ && cat << EOF > ${HOME}/.kube/certs/${CONTEXT}-${CLUSTER}/k8s-ca.crt
<certificate here>
EOF
kubectl config set-cluster ${CONTEXT}-${CLUSTER} \
    --certificate-authority=${HOME}/.kube/certs/${CONTEXT}-${CLUSTER}/k8s-ca.crt \
    --server=${CLUSTER_API}
kubectl config set-credentials ${ACCOUNT_NAME} \
    --token=$TOKEN
kubectl config set-context ${CONTEXT}-${CLUSTER} \
  --cluster=${CONTEXT}-${CLUSTER} --user=${ACCOUNT_NAME}
kubectl config use-context ${CONTEXT}-${CLUSTER}
```

**HINT** WERF_SECRET_KEY 6920dee6b9cfdfd9084728038c3bae11

