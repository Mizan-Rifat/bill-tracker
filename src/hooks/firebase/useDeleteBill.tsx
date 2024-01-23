import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { DOC_PATHS, db } from 'services/firebase';

const useBillDelete = (setIsLoading: (loading: boolean) => void) => {
  const deleteBill = async (id: string, type: 'dish' | 'wifi') => {
    const path = type === 'dish' ? DOC_PATHS.DISH_BILLS : DOC_PATHS.WIFI_BILLS;

    const docRef = doc(db, path, id);

    setIsLoading(true);
    try {
      const item = await deleteDoc(docRef);
      setIsLoading(false);
      toast.success('Successfully deleted.');
      return item;
    } catch (error) {
      console.log({ error });
    }
    setIsLoading(false);
  };

  return { deleteBill };
};

export default useBillDelete;
