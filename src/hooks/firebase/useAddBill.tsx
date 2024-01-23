import dayjs from 'dayjs';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { DOC_PATHS, db } from 'services/firebase';
import { Bill } from 'types';

const useAddBill = (setIsLoading?: (loading: boolean) => void) => {
  const addBill = async (data: Bill, type: 'wifi' | 'dish') => {
    const dishDocRef = collection(db, DOC_PATHS.DISH_BILLS);
    const wifiDocRef = collection(db, DOC_PATHS.WIFI_BILLS);

    let docRef = null;

    if (type === 'wifi') {
      docRef = wifiDocRef;
    } else {
      docRef = dishDocRef;
    }

    if (setIsLoading) {
      setIsLoading(true);
    }
    try {
      await addDoc(docRef, {
        user_id: data.user_id,
        created_at: dayjs(data.date).format(),
        // amount: Number(data.amount),
        paid: Number(data.paid),
        due: Number(data.due),
      });
      toast.success('Successfully created.');
    } catch (error) {
      console.log({ error });
    }
    if (setIsLoading) {
      setIsLoading(false);
    }
  };

  return { addBill };
};

export default useAddBill;
