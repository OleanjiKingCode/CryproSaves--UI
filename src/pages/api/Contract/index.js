import solc from 'solc';

export default async function handler(req, res) {
  try {
    const { contract, contractName } = req.query;
    const { artifact } = compile(contract, contractName);
    res.status(200).json({ artifact });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function compile(sourceCode, contractName) {
  const input = {
    language: 'Solidity',
    sources: { main: { content: sourceCode } },
    settings: { outputSelection: { '*': { '*': ['abi', 'evm.bytecode'] } } },
  };
  const output = solc.compile(JSON.stringify(input));
  const artifact = JSON.parse(output).contracts['main'][contractName];

  return {
    artifact: artifact,
  };
}
