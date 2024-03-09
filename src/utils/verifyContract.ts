// import axios, { AxiosRequestConfig } from 'axios';

// export const sendContractForVerification = async ({
//   contractAddress,
//   sourceCode,
//   contractName,
//   constructorArguments,
// }: {
//   contractAddress: string;
//   sourceCode: string;
//   contractName: string;
//   constructorArguments: any;
// }) => {
//   try {
//     let apiKey = '65HTGR197S8M887BJXZZVB8F5HGP9BKJ7C';
//     console.log(
//       contractAddress,
//       sourceCode,
//       contractName,
//       constructorArguments
//     );
//     const response = await axios.post('//api.polygonscan.com/api', {
//       apikey: '65HTGR197S8M887BJXZZVB8F5HGP9BKJ7C',
//       module: 'contract',
//       action: 'verifysourcecode',
//       contractaddress: contractAddress,
//       sourceCode: sourceCode,
//       codeformat: 'solidity-single-file',
//       contractname: contractName,
//       compilerversion: 'v0.8.24+commit.e11b9ed9',
//       optimizationUsed: 0,
//       runs: 20000,
//       constructorArguements: constructorArguments,
//       evmversion: 'london',
//       licenseType: 3,
//     });

//     console.log(response.data);
//     if (response.data.status === '1') {
//       // 1 = submission success, use the guid returned (response.data.result) to check the status of your submission.
//       // Average time of processing is 30-60 seconds
//       return response.data.result;
//     } else {
//       // 0 = error
//       throw new Error(
//         `${response.data.status}; ${response.data.message}; ${response.data.result}`
//       );
//     }
//   } catch (error) {
//     console.log('Error while verifying', error);
//   }
// };

// export const ChkVerificationStatus = async ({ guid }: { guid: string }) => {
//   try {
//     let apiKey = process.env.NEXT_MUMBAI_API_KEY;
//     const config: AxiosRequestConfig = {
//       params: {
//         apikey: apiKey,
//         guid: guid,
//         module: 'contract',
//         action: 'checkverifystatus',
//       },
//     };

//     const response = await axios.get('https://api.etherscan.io/api', config);

//     console.log(response.data);
//     console.log('status : ' + response.data.status); //0=Error, 1=Pass
//     console.log('message : ' + response.data.message); //OK, NOTOK
//     console.log('result : ' + response.data.result); //result explanation
//     return response.data.result;
//   } catch (error) {
//     console.log('Error while checking verification purpose', error);
//   }
// };


// const verifyContract = async () => {
//   console.log(data);
//   let guidResult = await sendContractForVerification({
//     sourceCode: data.sourceCode,
//     contractAddress: data.address,
//     contractName: data.name,
//     constructorArguments: 'string',
//   });
//   console.log('guidResult:', guidResult);
//   let status = await ChkVerificationStatus({ guid: guidResult });
//   console.log('status:', status);
// };