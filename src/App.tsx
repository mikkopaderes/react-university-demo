import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { faCaretDown, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';

import NotFound from './routes/NotFound';
import Universities from './routes/Universities';

library.add(faCaretDown, faTimesCircle);

function App() {
  const firebaseApp = useFirebaseApp();
  const firestore = getFirestore(firebaseApp);

  connectFirestoreEmulator(firestore, 'localhost', 8080);

  return (
    <FirestoreProvider sdk={firestore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Universities />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </FirestoreProvider>
  );
}

export default App;
