import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect } from 'react';
import { DOC_PATHS, db } from 'services/firebase';
import { getFsData } from 'services/helpers/utils';
import { useUsersStore } from 'services/stores/usersStore';

const usersRef = collection(db, DOC_PATHS.USERS);
const q = query(usersRef, orderBy('created_at'));

const useUsersFetch = (setIsLoading: (loading: boolean) => void) => {
  const { setRows } = useUsersStore();
  useEffect(() => {
    setIsLoading(true);
    onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map((doc) => getFsData(doc));
      setIsLoading(false);

      setRows(users);
    });
  }, []);
};

export default useUsersFetch;
