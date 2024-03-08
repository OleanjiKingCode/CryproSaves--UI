import fs from 'fs/promises';
import solc from 'solc';

export default async function handler(req, res) {
  try {
    const sourceCode = await fs.readFile(
      './src/pages/api/Contract/Demo.sol',
      'utf8'
    );
    const { artifact } = compile(sourceCode, 'Inbox');
    res.status(200).json({ artifact });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function compile(sourceCode, contractName) {
  const input = {
    language: 'Solidity',
    sources: { 'Demo.sol': { content: sourceCode } },
    settings: { outputSelection: { '*': { '*': ['abi', 'evm.bytecode'] } } },
  };

  const output = solc.compile(JSON.stringify(input));
  const artifact = JSON.parse(output).contracts['Demo.sol'][contractName];

  return {
    artifact: artifact,
  };
}
