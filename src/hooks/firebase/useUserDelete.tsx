import { deleteDoc, doc } from 'firebase/firestore';
import { DOC_PATHS, db } from 'services/firebase';

const useUserDelete = (setIsLoading: (loading: boolean) => void) => {
  const deleteUser = async (id: string) => {
    const docRef = doc(db, DOC_PATHS.USERS, id);
    setIsLoading(true);
    try {
      const item = await deleteDoc(docRef);
      setIsLoading(false);
      return item;
    } catch (error) {
      console.log({ error });
    }
    setIsLoading(false);
  };

  return { deleteUser };
};

export default useUserDelete;
