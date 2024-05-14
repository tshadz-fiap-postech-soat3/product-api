## Descrição
Gerenciamento de clusters com o minikube

## Instalação 

Site oficial -> https://minikube.sigs.k8s.io/docs/start/

## Rodar minikube

 ```bash
# Clone este repositório
$ git clone <https://github.com/tshadz/soat3-tech-chalenge>

# Acesse a pasta do projeto no terminal
$ cd ./soat3-tech-chalenge

# Iniciar o minikube
$ minikube start

# Deploy da aplicação
$ kubectl apply -f k8s/

# Rodar K9s em um namespace
$ minikube dashboard

```

## Minikube dashboard tela

![minikube tela](image-2.png)