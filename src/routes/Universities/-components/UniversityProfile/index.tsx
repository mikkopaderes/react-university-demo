import React, { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UniversityData from 'data/university';
import UrlChip from 'components/UrlChip';
import SubscribeForm from './SubscribeForm';
import styles from './index.module.css';

interface UniversityProfileProps {
  university: UniversityData;
  onCloseClick(): void;
}

function UniversityProfile({ university, onCloseClick }: UniversityProfileProps) {
  useEffect(() => {
    document.documentElement.style.setProperty('overflow', 'hidden');

    return () => {
      document.documentElement.style.removeProperty('overflow');
    };
  }, []);

  return (
    <section className={styles.host}>
      <div className={styles.scrim} />

      <div className={styles.card}>
        <div className={styles.topBar}>
          <button
            className={styles.navBackButton}
            data-testid="nav-back-button"
            type="button"
            onClick={onCloseClick}
          >
            <FontAwesomeIcon className={styles.navBackButtonIcon} icon="times-circle" />
          </button>
        </div>

        <h3 className={styles.name} data-testid="name">{university.name}</h3>
        <p className={styles.country} data-testid="country">{university.country}</p>
        <ul className={styles.websiteList}>
          {
            university.web_pages.map((webPage) => (
              <li className={styles.websiteListItem} key={webPage}>
                <UrlChip url={webPage} />
              </li>
            ))
          }
        </ul>

        <SubscribeForm university={university} />
      </div>
    </section>
  );
}

export default UniversityProfile;
