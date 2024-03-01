import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GetALLLockQuery } from '@/constants/LockUp';
import { APIURL } from '@/constants/urql';
import { useState } from 'react';

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export const useGetSavesDetails = () => {
  const [allSaves, setAllSaves] = useState([]);
  let lockedCount = 0;
  let unlockedCount = 0;
  let totalEth = 0;

  const getSavesData = async () => {
    try {
      const { data: allData } = await client.query({
        query: gql(GetALLLockQuery),
      });
      setAllSaves(allData.etherLockeds);
      allData.etherLockeds.map((save: any) => {
        save.locked === true ? (lockedCount += 1) : (unlockedCount += 1);
        totalEth += save.amount;
      });
    } catch (err) {
      console.log('Error fetching data: ', err);
    }
  };

  getSavesData();

  return {
    Saves: allSaves,
    SavesNum: allSaves.length,
    LockedSaves: lockedCount,
    UnlockedSaves: unlockedCount,
    EthSaved: totalEth,
  };
};
