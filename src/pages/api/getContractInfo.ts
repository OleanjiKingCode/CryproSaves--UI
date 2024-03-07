// api/getContractInfo.ts

import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import solc from 'solc';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Load the contract source code
    const sourceCode = await fs.readFile('./Demo.sol', 'utf8');

    // Compile the source code and retrieve the ABI and Bytecode
    const { abi, bytecode } = compile(sourceCode, 'Demo');

    // Send the ABI and Bytecode as a JSON response
    res.status(200).json({ abi, bytecode });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function compile(sourceCode: string, contractName: string) {
  // Create the Solidity Compiler Standard Input and Output JSON
  const input = {
    language: 'Solidity',
    sources: { main: { content: sourceCode } },
    settings: { outputSelection: { '*': { '*': ['abi', 'evm.bytecode'] } } },
  };

  // Parse the compiler output to retrieve the ABI and Bytecode
  const output = solc.compile(JSON.stringify(input));
  const artifact = JSON.parse(output).contracts.main[contractName];

  return {
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object,
  };
}
