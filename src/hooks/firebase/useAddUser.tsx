import { addDoc, collection } from 'firebase/firestore';
import { DOC_PATHS, db } from 'services/firebase';
import { User } from 'types';

const useAddUser = (setIsLoading: (loading: boolean) => void) => {
  const addUser = async (data: User) => {
    const docRef = collection(db, DOC_PATHS.USERS);
    setIsLoading(true);

    try {
      const user = await addDoc(docRef, data);
      console.log({ user });
    } catch (error) {
      console.log({ error });
    }
    setIsLoading(false);
  };

  return { addUser };
};

export default useAddUser;
