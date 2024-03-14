// import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
// import { GetALLLockQuery } from '@/constants/LockUp';
// import { APIURL } from '@/constants/urql';
// import { useEffect, useState } from 'react';
// import { useReadContract } from 'wagmi';
// import { LockupABIFull } from '@/constants/LockupData';

// const client = new ApolloClient({
//   uri: APIURL,
//   cache: new InMemoryCache(),
// });

// export const useGetSavesDetails = ({ ca }: { ca: `0x${string}` }) => {
//   let allSaves: any = [];
//   let lockedCount = 0;
//   let unlockedCount = 0;
//   let totalEth = 0;

//   // const getSavesDataUsingSubgraph = async () => {
//   //   try {
//   //     const { data: allData } = await client.query({
//   //       query: gql(GetALLLockQuery),
//   //     });
//   //     setAllSaves(allData.etherLockeds);
//   //     allData.etherLockeds.map((save: any) => {
//   //       save.locked === true ? (lockedCount += 1) : (unlockedCount += 1);
//   //       totalEth += save.amount;
//   //     });
//   //   } catch (err) {
//   //     console.log('Error fetching data: ', err);
//   //   }
//   // };

//   const fetchData = async () => {
//     try {
//       const { data } = useReadContract({
//         abi: LockupABIFull,
//         address: '0xf80ec3ffC2DB71E482e9B4A4032536d44ffb7CBf',
//         functionName: 'getAllLockUps',
//       });
//       console.log(data, 'data');
//       if (Array.isArray(data)) {
//         allSaves = data;
//         data.forEach((save: any) => {
//           // Changed map to forEach
//           save.locked === true ? (lockedCount += 1) : (unlockedCount += 1);
//           totalEth += save.amount;
//         });
//       }
//     } catch (err) {
//       console.log('Error fetching data: ', err);
//     }
//   };

//   fetchData();

//   // getSavesDataUsingSubgraph();

//   return {
//     Saves: allSaves,
//     SavesNum: allSaves.length,
//     LockedSaves: lockedCount,
//     UnlockedSaves: unlockedCount,
//     EthSaved: totalEth,
//   };
// };
