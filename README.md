# Terminal Commands

Aqui estão alguns utilitários que uso no meu dia a dia para facilitar minha vida no terminal.

## Instalação dos Utilitários

Para instalar corretamente, siga os passos abaixo:

1. Clone o repositório.
2. Use o comando `npm install` para instalar todas as dependências necessárias.

**Nota:** É necessário ter o Node.js na versão 18 ou superior para executar todos os comandos corretamente.

### Adicionando Comandos no Windows

Para adicionar os comandos como `gitcommit`, `guuid` e `rstring` no Windows, siga os passos abaixo:

1. No menu Iniciar, pesquise por "Variáveis de ambiente".
2. Clique em "Variáveis de ambiente" no canto inferior direito.
3. Selecione "Path" e clique em "Editar".
4. Adicione a pasta `utils` do repositório clonado.
5. Feche e reabra o terminal ou o Visual Studio Code para que os comandos sejam carregados.

## Comandos Disponíveis

Atualmente, temos três comandos disponíveis. Novos comandos serão adicionados conforme necessário.

### `guuid`

Gera UUIDs em qualquer versão, da versão 1 à 7.

**Uso:**

```sh
guuid <número de uuids gerados>
```

Para especificar a versão do UUID, use o parâmetro `-v`:

```sh
guuid 1 -v 7
```

O comando acima gera um UUID na versão 7.

### `rstring`

Gera strings aleatórias, úteis para chaves de tokens, senhas, etc.

**Uso:**

```sh
rstring <tamanho da string> <quantidade de strings>
```

Para incluir símbolos nas strings geradas, use o parâmetro `--symbols` ou sua forma abreviada `-s`:

```sh
rstring <tamanho da string> <quantidade de strings> -s
```

### `gitcommit`

Padroniza seus commits de forma simples. Este comando é autoexplicativo e fornece instruções e opções diretamente no terminal.
