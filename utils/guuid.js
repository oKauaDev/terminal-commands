const { v1, v2, v3, v4, v5, v6, v7 } = require("uuid");
const TEXT = require("../colors");

const args = process.argv.slice(2);

if (args.length < 1 || isNaN(args[0])) {
  console.log(
    `${TEXT.COLOR.RED}Usage: guuid <count>\n${TEXT.COLOR.RED}Props: --version or -v 1|2|3|4|5|6|7`
  );
  process.exit(1);
}

function generateUUID() {
  const args = process.argv.slice(2);
  const indexOf = args.indexOf("--version") === -1 ? args.indexOf("-v") : args.indexOf("--version");

  if (indexOf === -1) {
    return {
      name: "V4",
      uuid: () => v4(),
    };
  }

  const version = args[indexOf + 1];

  switch (version) {
    case "1":
      return {
        name: "V1",
        uuid: () => v1(),
      };
    case "2":
      return {
        name: "V2",
        uuid: () => v2(),
      };
    case "3":
      return {
        name: "V3",
        uuid: () => v3(),
      };
    case "4":
      return {
        name: "V4",
        uuid: () => v4(),
      };
    case "5":
      return {
        name: "V5",
        uuid: () => v5(),
      };
    case "6":
      return {
        name: "V6",
        uuid: () => v6(),
      };
    case "7":
      return {
        name: "V7",
        uuid: () => v7(),
      };
    default:
      return null;
  }
}

const count = parseInt(args[0]);

const uuid = generateUUID();

if (uuid) {
  let text = `${TEXT.RESET}-------------UUIDS ${uuid.name}-----------\n`;
  for (let i = 0; i < count; i++) {
    text += `${TEXT.COLOR.YELLOW}${i + 1} ${TEXT.RESET}| ${TEXT.COLOR.GREEN}${uuid.uuid()}\n`;
  }

  text += `${TEXT.RESET}--------------------------------\n`;

  console.log(text);
} else {
  console.log(`${TEXT.COLOR.RED}Usage: guuid <count> --version 1|2|3|4|5|6|7`);
  process.exit(1);
}
