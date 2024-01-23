/* eslint-disable @typescript-eslint/ban-ts-comment */
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { DOC_PATHS, db } from 'services/firebase';

const useUpdateBill = (setIsLoading: (loading: boolean) => void) => {
  const updateBill = async (
    id: string,
    data: { paid: number; due: number; created_at: Date | string },
    type: 'dish' | 'wifi',
  ) => {
    const path = type === 'dish' ? DOC_PATHS.DISH_BILLS : DOC_PATHS.WIFI_BILLS;

    const docRef = doc(db, path, id);
    setIsLoading(true);

    try {
      //@ts-ignore
      const item = await updateDoc(docRef, data);
      setIsLoading(false);
      toast.success('Successfully updated.');
      return item;
    } catch (error) {
      console.log({ error });
    }
    setIsLoading(false);
  };

  return { updateBill };
};

export default useUpdateBill;
