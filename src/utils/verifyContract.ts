import axios, { AxiosRequestConfig } from 'axios';

export const sendContractForVerification = async ({
  contractAddress,
  sourceCode,
  contractName,
  constructorArguments,
}: {
  contractAddress: string;
  sourceCode: string;
  contractName: string;
  constructorArguments: any;
}) => {
  try {
    let apiKey = process.env.NEXT_MUMBAI_API_KEY;
    const response = await axios.post('https://api.etherscan.io/api', {
      apikey: apiKey,
      module: 'contract',
      action: 'verifysourcecode',
      contractaddress: contractAddress,
      sourceCode: sourceCode,
      codeformat: 'solidity-single-file',
      contractname: contractName,
      compilerversion: 'v0.8.23+commit.f704f362',
      optimizationUsed: 0,
      runs: 200,
      constructorArguements: constructorArguments,
      evmversion: '',
      licenseType: '3',
    });

    console.log(response.data);
    if (response.data.status === '1') {
      // 1 = submission success, use the guid returned (response.data.result) to check the status of your submission.
      // Average time of processing is 30-60 seconds
      return response.data.result;
    } else {
      // 0 = error
      throw new Error(
        `${response.data.status}; ${response.data.message}; ${response.data.result}`
      );
    }
  } catch (error) {
    console.log('Error while verifying', error);
  }
};

export const ChkVerificationStatus = async ({ guid }: { guid: string }) => {
  let apiKey = process.env.NEXT_MUMBAI_API_KEY;
  try {
    const config: AxiosRequestConfig = {
      params: {
        apikey: apiKey,
        guid: guid,
        module: 'contract',
        action: 'checkverifystatus',
      },
    };

    const response = await axios.get('https://api.etherscan.io/api', config);

    console.log(response.data);
    console.log('status : ' + response.data.status); //0=Error, 1=Pass
    console.log('message : ' + response.data.message); //OK, NOTOK
    console.log('result : ' + response.data.result); //result explanation
    return response.data.result;
  } catch (error) {
    console.log('Error while checking verification purpose', error);
  }
};
