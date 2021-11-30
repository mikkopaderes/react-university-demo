import React from 'react';

import { Link } from 'react-router-dom';

import styles from './index.module.css';

function NotFound(): JSX.Element {
  return (
    <div className={styles.host}>
      <p>{'Oops! Looks like this page doesn\'t exist'}</p>

      <Link to="/">Go back to home page</Link>
    </div>
  );
}

export default NotFound;
