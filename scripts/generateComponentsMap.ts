// @ts-ignore
const fs = require("fs");
// @ts-ignore
const path = require("path");
// @ts-ignore
const SELECTORS_DIR = path.resolve(__dirname, "../components/selectors");
const OUTPUT_FILE = path.resolve(
  __dirname,
  "../components/registry/ComponentsMap.ts"
);

function pascalCase(name: string) {
  return name.replace(/(^\w|-\w)/g, (m) => m.replace(/-/, "").toUpperCase());
}

// @ts-ignore
function getComponentFiles(dirPath: string) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((dir) => {
      const indexFile = path.join(dirPath, dir.name, "index.tsx");
      const namedFile = path.join(dirPath, dir.name, `${dir.name}.tsx`);

      if (fs.existsSync(indexFile))
        return { name: dir.name, path: `../selectors/${dir.name}` };
      if (fs.existsSync(namedFile))
        return { name: dir.name, path: `../selectors/${dir.name}/${dir.name}` };

      return null;
    })
    .filter(Boolean) as { name: string; path: string }[];
}

function main() {
  const files = getComponentFiles(SELECTORS_DIR);

  const imports = files
    .map(({ name, path }) => `import { ${name} } from '${path}';`)
    .join("\n");

  const exports = `export const ComponentsMap = {\n${files
    .map(({ name }) => `  ${name},`)
    .join("\n")}\n};`;

  fs.writeFileSync(OUTPUT_FILE, `${imports}\n\n${exports}\n`);
  console.log("✅ ComponentsMap.ts 생성 완료");
}

main();
