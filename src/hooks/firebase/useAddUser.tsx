import { addDoc, collection } from 'firebase/firestore';
import { useMemo } from 'react';
import { DOC_PATHS, db } from 'services/firebase';
import { useUsersStore } from 'services/stores/usersStore';
import { User } from 'types';

const useAddUser = (setIsLoading: (loading: boolean) => void) => {
  const { rows } = useUsersStore();

  const id = useMemo(() => {
    return (
      (rows
        .map((row) => row.id)
        .sort()
        .reverse()[0] || 0) + 1
    );
  }, [rows]);

  const addUser = async (data: User) => {
    const docRef = collection(db, DOC_PATHS.USERS);
    setIsLoading(true);
    try {
      const user = await addDoc(docRef, {
        ...data,
        id,
        created_at: new Date(),
        amount: Number(data.amount),
      });
      console.log({ user });
    } catch (error) {
      console.log({ error });
    }
    setIsLoading(false);
  };

  return { addUser };
};

export default useAddUser;
