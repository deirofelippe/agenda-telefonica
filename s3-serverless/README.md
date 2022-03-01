# S3 Serverless Framework e Localstack

## Executando o S3

1. instale o serverless framework: `npm i -g serverless-framework`
1. instale o [cli da aws]() ou use a imagem do docker
   1. `docker run --rm -it -v ~/.aws:/root/.aws amazon/aws-cli <CLI-COMMAND>`
   1. `docker run --rm -it -v ~/.aws:/root/.aws amazon/aws-cli s3 ls`
1. crie uma [conta na aws]()
   1. crie um usuario IAM na aws e de as permissoes relacionada ao S3
   1. copie a key e secret
   1. cole no comando abaixo para configurar as credenciais da aws na sua maquina
      ```bash
         serverless config credentials -o \
            --provider aws \
            --key KEY \
            --secret SECRET
      ```
1. execute `sls deploy -v`
1. confira com o cli o bucket criado
   1. `aws s3 ls`

### Deletando toda a stack

1. pegue o nome da stack no output do comando `sls info` (por exemplo *agenda-s3-dev*), que será deletado no passo 4
1. `sls remove -v`
1. `aws s3 ls` e delete todos os buckets que tem `agenda` no nome
   1. `aws s3 rm --recursive s3://agenda-telefonica-s3`
   1. `aws s3api delete-bucket --bucket agenda-telefonica-s3`
   1. `aws s3 rm --recursive s3://agenda-s3-dev-serverlessdeploymentbucket-1l3iqyn68fswq`
   1. `aws s3api delete-bucket --bucket agenda-s3-dev-serverlessdeploymentbucket-1l3iqyn68fswq`
1. `aws cloudformation delete-stack --stack-name agenda-s3-dev`
1. `rm -rf .serverless`

## Serverless framework com plugin do localstack

1. descomente as linhas do localstack no arquivo `serverless.yaml`
1. rode `sls deploy -v` (opcional, da pra usar o localstack só usando a cli)
1. use o alias da aws cli para redirecionar pro localstack: `alias awslocal="aws --endpoint-url=http://localhost:4566"`

## Comandos do AWS CLI 

- `aws s3 mb s3://teste`: cria o bucket teste no s3
- `aws s3 ls`: lista os buckets
- `aws s3 ls s3://teste`: lista os objetos no bucket teste
- `aws s3 cp ./README.md s3://teste`: faz upload do arquivo local para o bucket teste
- `aws s3 rm --recursive s3://agenda-telefonica-s3`