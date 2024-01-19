/* eslint-disable @typescript-eslint/ban-ts-comment */
import { doc, updateDoc } from 'firebase/firestore';
import { DOC_PATHS, db } from 'services/firebase';
import { User } from 'types';

const useUpdateUser = (setIsLoading: (loading: boolean) => void) => {
  const updateUser = async (id: string, data: User) => {
    const docRef = doc(db, DOC_PATHS.USERS, id);
    setIsLoading(true);

    console.log({ data });

    try {
      //@ts-ignore
      const item = await updateDoc(docRef, data);
      setIsLoading(false);
      return item;
    } catch (error) {
      console.log({ error });
    }
    setIsLoading(false);
  };

  return { updateUser };
};

export default useUpdateUser;
