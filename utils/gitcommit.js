const TEXT = require("../colors");
const { exec } = require("child_process");
const inquirer = require("inquirer");

const args = process.argv.slice(2);

function isForcePush() {
  return args.includes("--force") || args.includes("-f");
}

const commitTypes = [
  { name: "🐛 fix", value: "fix" },
  { name: "✨ add", value: "add" },
  { name: "🚀 feat", value: "feat" },
  { name: "📝 docs", value: "docs" },
  { name: "💄 style", value: "style" },
  { name: "♻️ refactor", value: "refactor" },
  { name: "✅ test", value: "test" },
  { name: "🔧 chore", value: "chore" },
];

const filesTypes = [
  { name: "📂 All files", value: "." },
  { name: "🗄️ -A", value: "-A" },
  { name: "📁 Only changed", value: "--staged" },
  { name: "📄 Only untracked", value: "--untracked-files=no" },
  { name: "🗃️ Other files", value: "OTHER_FILES" },
];

function isGitRepositotyInFolder() {
  return new Promise((resolve, reject) => {
    exec("git rev-parse --is-inside-work-tree", (error, stdout, stderr) => {
      if (error) {
        if (error.message.includes("not")) {
          resolve(false);
          return;
        }

        reject(error);
        return;
      }

      if (stderr) {
        reject(new Error(stderr));
        return;
      }

      if (stdout.trim() === "true" || stdout.trim().includes("true")) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function askCommitType() {
  return inquirer.default.prompt([
    {
      type: "list",
      name: "commitType",
      message: "Escolha o tipo de commit:",
      choices: commitTypes,
    },
  ]);
}

async function askFilesType() {
  const filesBySelect = await inquirer.default.prompt([
    {
      type: "list",
      name: "filesTypes",
      message: "Escolha os arquivos que deseja alterar:",
      choices: filesTypes,
    },
  ]);

  if (filesBySelect.filesTypes === "OTHER_FILES") {
    const files = await inquirer.default.prompt([
      {
        type: "input",
        name: "filesTypes",
        message: "Digite os arquivos que deseja alterar (separados por espaço):",
      },
    ]);

    return files;
  }

  return filesBySelect;
}

function askCommitMessage() {
  return inquirer.default.prompt([
    {
      type: "input",
      name: "commitMessage",
      message: "Digite a mensagem do commit:",
      validate: (input) => {
        if (!input) {
          return "⚠️ A mensagem de commit não pode estar vazia.";
        }

        if (input.length < 10) {
          const toFinish = 10 - input.length;

          return `⚠️ Sua mensagem de commit deve ser detalhada e ter mais de 10 caracteres, faltam ${toFinish} caracteres.`;
        }

        return true;
      },
    },
  ]);
}

function askCommitDescription() {
  return inquirer.default.prompt([
    {
      type: "input",
      name: "commitDescription",
      message: "Digite a descrição do commit (opcional):",
    },
  ]);
}

function askArgsInCommandsDescription() {
  return inquirer.default.prompt([
    {
      type: "confirm",
      name: "confirmCommands",
      message: "Deseja usar aliases em algum comando ?",
      default: false,
    },
  ]);
}

function askArgsAddDescription() {
  return inquirer.default.prompt([
    {
      type: "input",
      name: "addArgs",
      message: `Quais aliases você deseja usar no comando ${TEXT.COLOR.CYAN}git add${TEXT.RESET} ? (opcional):`,
    },
  ]);
}

function askArgsCommitDescription() {
  return inquirer.default.prompt([
    {
      type: "input",
      name: "commitArgs",
      message: `Quais aliases você deseja usar no comando ${TEXT.COLOR.CYAN}git commit${TEXT.RESET} ? (opcional):`,
    },
  ]);
}

function askArgsPushDescription() {
  return inquirer.default.prompt([
    {
      type: "input",
      name: "PushArgs",
      message: `Quais aliases você deseja usar no comando ${TEXT.COLOR.CYAN}git push${TEXT.RESET} ? (opcional):`,
    },
  ]);
}

function confirmCommandLine(commands) {
  let commandsString = "";

  commands.forEach((command) => {
    commandsString += `• ${command}\n`;
  });

  return inquirer.default.prompt([
    {
      type: "confirm",
      name: "confirmCommands",
      message: `Vamos executar os seguintes comandos no terminal para efetuar os commits:\n\n${commandsString}\n\nDeseja continuar?`,
    },
  ]);
}

function dispatchCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(
        `${TEXT.COLOR.RED}❌ Erro ao enviar o commit: ${TEXT.COLOR.YELLOW}${error.message}`
      );
      return;
    }

    callback(error, stdout, stderr);
  });
}

async function commit(files, type, message, description, args) {
  const fullMessage = description ? `${message}\n\n${description}` : message;

  const argsAdd = args[0] ?? false;
  const argsCommit = args[1] ?? false;
  const argsPush = args[2] ?? false;

  const commands = [
    "git add " + files + (argsAdd ? ` ${argsAdd}` : ""),
    `git commit -m "${type}: ${fullMessage.replace(/"/g, '\\"')}"` +
      (argsCommit ? ` ${argsCommit}` : ""),
    `git push${isForcePush() ? " --force" : ""}` + (argsPush ? ` ${argsPush}` : ""),
  ];

  const confirm = await confirmCommandLine(commands);

  if (confirm.confirmCommands) {
    console.log("📝 Adicionando os arquivos...");
    dispatchCommand(commands[0], (error, stdout, stderr) => {
      console.log("📦 Criando o pacote do commit...");
      dispatchCommand(commands[1], (error, stdout, stderr) => {
        console.log("🚀 Enviando commit...");
        dispatchCommand(commands[2], (error, stdout, stderr) => {
          console.log(`${TEXT.COLOR.GREEN} ✅ Commit enviado com sucesso: ${stdout}`);
        });
      });
    });
  } else {
    console.log(`${TEXT.COLOR.RED}🚫 Execução dos comandos cancelada pelo usuário.`);
  }
}

async function main() {
  try {
    const isGitRepository = await isGitRepositotyInFolder();

    if (!isGitRepository) {
      const currentDirectory = process.cwd();
      console.log(
        `${TEXT.COLOR.RED}🚫 O diretório '${currentDirectory}' não está dentro de um repositório Git.`
      );
      process.exit();
      return;
    }

    const commitFiles = await askFilesType();
    const commitType = await askCommitType();
    const commitMessage = await askCommitMessage();
    const commitDescription = await askCommitDescription();

    const args = await askArgsInCommandsDescription();
    let useArgs = [];

    if (args.confirmCommands) {
      const argsAdd = await askArgsAddDescription();
      const argsCommit = await askArgsCommitDescription();
      const argsPush = await askArgsPushDescription();

      useArgs = [argsAdd.addArgs, argsCommit.commitArgs, argsPush.PushArgs];
    }

    await commit(
      commitFiles.filesTypes,
      commitType.commitType,
      commitMessage.commitMessage,
      commitDescription.commitDescription,
      useArgs
    );
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes("force closed")) {
        console.log("\n\n🔴 Operação abortada pelo usuário. Saindo...\n");
        process.exit();
        return;
      }

      console.log(`${TEXT.COLOR.RED}❌ Erro: ${TEXT.COLOR.YELLOW}${e.message}`);
      return;
    }

    console.log(`${TEXT.COLOR.RED}❌ Erro: ${TEXT.COLOR.YELLOW}${String(e)}`);
  }
}

main();
