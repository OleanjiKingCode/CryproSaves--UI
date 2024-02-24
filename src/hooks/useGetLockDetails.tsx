import { useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GetALLLockQuery } from '@/constants/LockUp';
import { APIURL } from '@/constants/urql';

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export const useGetLockDetails = () => {
  const [saves, setSavesData] = useState([]);

  const getSavesData = async () => {
    try {
      const { data } = await client.query({
        query: gql(GetALLLockQuery),
      });

      setSavesData(data.etherLockeds);
    } catch (err) {
      console.log('Error fetching data: ', err);
    }
  };

  getSavesData();

  return {
    Locks: saves ?? [],
    SavesNum: saves.length,
    LockedSaves: 0,
    UnlockedSaves: 0,
    EthSaved: 10,
  };
};
