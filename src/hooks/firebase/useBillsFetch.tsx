import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect } from 'react';
import { DOC_PATHS, db } from 'services/firebase';
import { getFsData } from 'services/helpers/utils';
import { useBillsStore } from 'services/stores/billStore';
import { useUsersStore } from 'services/stores/usersStore';

const useBillsFetch = (setIsLoading: (loading: boolean) => void, type: 'wifi' | 'dish') => {
  const path = type === 'dish' ? DOC_PATHS.DISH_BILLS : DOC_PATHS.WIFI_BILLS;
  const billsRef = collection(db, path);
  const q = query(billsRef, orderBy('created_at'));

  const { setBills, setInitialBills } = useBillsStore();
  const { usersMap } = useUsersStore();

  useEffect(() => {
    setIsLoading(true);
    onSnapshot(q, (snapshot) => {
      const bills = snapshot.docs.map((doc) => getFsData(doc));

      const billUserMap = bills.map((bill) => ({ ...bill, user: usersMap[bill.user_id] }));

      setIsLoading(false);

      setBills(billUserMap);
      setInitialBills(billUserMap);
    });
  }, []);
};

export default useBillsFetch;
