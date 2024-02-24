import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GetALLLockQuery } from '@/constants/LockUp';
import { APIURL } from '@/constants/urql';

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export const useGetSavesDetails = () => {
  let saves: any[] = [];

  const getSavesData = async () => {
    try {
      const { data } = await client.query({
        query: gql(GetALLLockQuery),
      });

      saves = data.etherLockeds;
    } catch (err) {
      console.log('Error fetching data: ', err);
    }
  };

  getSavesData();

  return {
    Saves: saves ?? [],
    SavesNum: saves.length,
    LockedSaves: 0,
    UnlockedSaves: 0,
    EthSaved: 10,
  };
};
