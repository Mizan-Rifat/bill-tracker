import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// live;

const firebaseConfig = {
  apiKey: 'AIzaSyDfvBhVmpCc9FCtAR1UcC0GijcuFRmA2M4',
  authDomain: 'payroll-10030.firebaseapp.com',
  projectId: 'payroll-10030',
  storageBucket: 'payroll-10030.appspot.com',
  messagingSenderId: '995287457676',
  appId: '1:995287457676:web:13946a8a7b7e61642cc0a9',
};

// test

// const firebaseConfig = {
//   apiKey: 'AIzaSyBv7H9Si3ytdgB79Vp06YmLZBt_Y5bRoWw',
//   authDomain: 'tn-snacks-staging.firebaseapp.com',
//   projectId: 'tn-snacks-staging',
//   storageBucket: 'tn-snacks-staging.appspot.com',
//   messagingSenderId: '810232991026',
//   appId: '1:810232991026:web:90e8376ddfcbc187011b2b'
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const currentUser = auth.currentUser;

export const DOC_PATHS = {
  USERS: 'users',
};
