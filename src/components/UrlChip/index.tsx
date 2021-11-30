import React from 'react';

import styles from './index.module.css';

interface UrlChipProps {
  className?: string;
  url: string;
}

function convertToHostname(value: string) {
  const url = new URL(value);

  return url.hostname;
}

function UrlChip({ className, url }: UrlChipProps) {
  return (
    <a
      className={`${styles.host} ${className}`}
      data-testid="url"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      {convertToHostname(url)}
    </a>
  );
}

UrlChip.defaultProps = {
  className: '',
};

export default UrlChip;
