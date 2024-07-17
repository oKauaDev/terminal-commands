const TEXT = require("../colors");

function randomString(length, symbols = false) {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  if (symbols) {
    characters += "!@#$%^&*()_+-=[]{}|;':\",./<>?";
  }

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function isSymbols() {
  return process.argv.includes("--symbols") || process.argv.includes("-s");
}

const args = process.argv.slice(2);

if (args.length < 1 || isNaN(args[0])) {
  console.log(
    `${TEXT.COLOR.RED}Usage: rstring <lenght> <count=1>\n${TEXT.COLOR.RED}Props: --symbols or -s`
  );
  process.exit(1);
}

let count = parseInt(args[1] === "--symbols" || args[1] === "-s" ? 1 : args[1] ?? 1);

if (isNaN(count)) {
  count = 1;
}

const num = parseInt(args[0]);

const symbols = isSymbols();

let text = `${TEXT.RESET}-------------CODES-------------\n`;
for (let i = 0; i < count; i++) {
  text += `${TEXT.COLOR.YELLOW}${i + 1} ${TEXT.RESET}| ${TEXT.COLOR.GREEN}${randomString(
    num,
    symbols
  )}\n`;
}

text += `${TEXT.RESET}-------------------------------`;

console.log(text);
