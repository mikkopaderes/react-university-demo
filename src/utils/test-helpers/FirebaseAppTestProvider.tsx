import { ReactNode } from 'react';

import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { FirebaseAppProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';

interface FirebaseAppProviderProps {
  children: ReactNode;
}

function FirebaseAppTestProvider({ children }: FirebaseAppProviderProps): JSX.Element {
  const firebaseConfig = {
    apiKey: '123qweasd',
    authDomain: 'react-demo.firebaseapp.com',
    databaseURL: 'https://react-demo.firebaseio.com',
    projectId: 'react-demo',
    storageBucket: 'react-demo.appspot.com',
    messagingSenderId: '123qweasd',
  };

  const firebaseApp = useFirebaseApp();
  const firestore = getFirestore(firebaseApp);

  try {
    connectFirestoreEmulator(firestore, 'localhost', 8080);
  } catch {
    // Do nothing
  }

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirestoreProvider sdk={firestore}>
        {children}
      </FirestoreProvider>
    </FirebaseAppProvider>
  )
}

export default FirebaseAppTestProvider;
