# Terminal Commands

Aqui estão apenas alguns utilitários que uso no meu dia a dia para facilitar minha vida usando o terminal.

## Instalação dos utilitários

Para instalar corretamente basta clonar o repositório e usar o comando `npm install` para instalar todas as depêndencias necessárias, vale lembrar que voc6e deve ter o node na versão 18 ou superior para rodar corretamente todos os commandos.

Para adicionar os comandos como `gitcommit`, `guuid` e `rstring` no windows, siga o passo a passo:

- No seu menu iniciar pesquise por "Variáveis de ambiente";
- Após isso no canto inferior direito teremos a opção "Variáveis de ambiente", basta clicar nela;
- Após isso selecione "Path" com 2 clicks que deve estar perto do topo da janela, depois vá em um campo vazio e adiicone a pasta utils do repositório que você clonou;
- Após isso se você estiver com um terminal aberto ou o vscode, basta fechar que os comandos vão carregar.

## Comandos

Atualmente temos apenas 3 comandos disponíveis, mas conforme minha necessidade irei adicionando mais.

### guuid

Esse é um comando responsável por gerar uuid em qualquer versão, seja na sua versão 1 até a versão 7. Para usar esse comando basta usar no terminal `guuid <número de uuids gerados>`, se quiser, você pode usar o parâmetro `-v` para selecionar a versão do uuid, assim: `guuid 1 -v 7`, isso irá gerar os uuids na versão 7.

### rstring

O comando `rstring` serve para gerar strings aleatórias, seja para chave de tokens, senhas ou mais. É um comando simples mais cheio de opções, para usar, basta digitar `rstring <tamanho da string> <quantidade de string>` além de ser possível gerar strings com simbolos usando o parâmetro `--symbols` ou sua forma abreviada `-s`, isso irá gerar as strings com simbolos, segue o exemplo: `rstring <tamanho da string> <quantidade de string> -s`

### gitcommit

Esse comando serve para padronizar seus commits de uma maneira fácil, esse é um comando auto sugestivo, não precisa de um passo a passo visto que o próprio comando te dara as instruções e opções corretas.
