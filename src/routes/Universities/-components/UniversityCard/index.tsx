import React from 'react';

import UniversityData from 'data/university';
import UrlChip from 'components/UrlChip';
import styles from './index.module.css';

interface UniversityCardProps {
  className?: string;
  university: UniversityData;
  onClick(university: UniversityData): void;
}

function UniversityCard({ className, university, onClick }: UniversityCardProps) {
  return (
    <article className={`${styles.host} ${className}`}>
      <button
        className={styles.primaryActionButton}
        data-testid="primary-action-button"
        type="button"
        aria-label={`Open ${university.name}`}
        onClick={() => onClick(university)}
      />

      <h2 className={styles.name} data-testid="name">{university.name}</h2>
      <p className={styles.country} data-testid="country">{university.country}</p>

      <ul className={styles.websiteList}>
        {
          university.web_pages.map((webPage) => (
            <li data-testid="web-page" key={webPage}>
              <UrlChip className={styles.websiteLink} url={webPage} />
            </li>
          ))
        }
      </ul>
    </article>
  );
}

UniversityCard.defaultProps = {
  className: '',
};

export default UniversityCard;
