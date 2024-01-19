import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { DOC_PATHS, db } from 'services/firebase';
import { getFsData } from 'services/helpers/utils';

const usersRef = collection(db, DOC_PATHS.USERS);

const useUsersFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    onSnapshot(usersRef, (snapshot) => {
      const users = snapshot.docs.map((doc) => getFsData(doc));
      console.log({ users });
      setIsLoading(false);
      setData(users);
    });
  }, []);

  return { isLoading, data };
};

export default useUsersFetch;
