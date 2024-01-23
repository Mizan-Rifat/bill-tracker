import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { DOC_PATHS, db } from 'services/firebase';
import { User } from 'types';

const useAddUser = (setIsLoading: (loading: boolean) => void) => {
  const addUser = async (data: User) => {
    const docRef = collection(db, DOC_PATHS.USERS);
    setIsLoading(true);
    try {
      await addDoc(docRef, {
        ...data,
        created_at: new Date(),
        dish_amount: Number(data.dish_amount),
        wifi_amount: Number(data.wifi_amount),
      });
      toast.success('Successfully created.');
    } catch (error) {
      console.log({ error });
    }
    setIsLoading(false);
  };

  return { addUser };
};

export default useAddUser;
