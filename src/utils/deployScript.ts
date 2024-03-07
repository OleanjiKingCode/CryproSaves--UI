// import { promises as fs } from "fs";
// import solc from "solc";


// async function main(): Promise<void> {
//   // Load the contract source code
//   const sourceCode: string = await fs.readFile("Demo.sol", "utf8");
//   // Compile the source code and retrieve the ABI and Bytecode
//   const { abi, bytecode } = compile(sourceCode, "Demo");
//   // Store the ABI and Bytecode into a JSON file
//   const artifact: string = JSON.stringify({ abi, bytecode }, null, 2);
//   await fs.writeFile("Demo.json", artifact);
// }

// function compile(sourceCode: string, contractName: string): { abi: any; bytecode: string } {
//   // Create the Solidity Compiler Standard Input and Output JSON
//   const input: any = {
//     language: "Solidity",
//     sources: { main: { content: sourceCode } },
//     settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } },
//   };
//   // Parse the compiler output to retrieve the ABI and Bytecode
//   const output: string = solc.compile(JSON.stringify(input));
//   const artifact: any = JSON.parse(output).contracts.main[contractName];
//   return {
//     abi: artifact.abi,
//     bytecode: artifact.evm.bytecode.object,
//   };
// }

// main();
