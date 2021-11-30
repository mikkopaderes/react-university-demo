import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import UniversityData from 'data/university';
import SearchBar from './-components/SearchBar';
import UniversityCard from './-components/UniversityCard';
import UniversityProfile from './-components/UniversityProfile';
import styles from './index.module.css';

function removeDuplicateUniversities(universities: UniversityData[]): UniversityData[] {
  const ids: string[] = [];

  return universities.filter((university) => {
    const id = `${university.name}__${university.country}`;

    if (ids.includes(id)) {
      return false;
    }

    ids.push(id);

    return true;
  });
}

async function queryUniversities(
  name?: string | null,
  country?: string | null,
): Promise<UniversityData[]> {
  const url = new URL('http://universities.hipolabs.com/search');

  if (name) {
    url.searchParams.append('name', name);
  }

  if (country) {
    url.searchParams.append('country', country);
  }

  const response = await fetch(url.href);
  const result = await response.json();

  return result;
}

function Universities(): JSX.Element {
  const [universities, setUniversities] = useState<UniversityData[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleUniversityProfile, setVisibleUniversityProfile] = useState<UniversityData | null>();

  useEffect(() => {
    const query = searchParams.get('query');
    const country = searchParams.get('country');

    if (query || country) {
      queryUniversities(query, country).then((result) => {
        const uniqueUniversities = removeDuplicateUniversities(result);

        setUniversities(uniqueUniversities);
      });
    } else {
      setUniversities([]);
    }
  }, [searchParams]);

  return (
    <>
      <SearchBar
        query={searchParams.get('query') || ''}
        country={searchParams.get('country') || ''}
        onChange={setSearchParams}
      />

      <section className={styles.deck}>
        {universities.map((university) => (
          <UniversityCard
            className={styles.card}
            datatest-id="university"
            key={`${university.alpha_two_code}__${university.name}`}
            university={university}
            onClick={setVisibleUniversityProfile}
          />
        ))}
      </section>

      {visibleUniversityProfile && (
        <UniversityProfile
          university={visibleUniversityProfile}
          onCloseClick={() => setVisibleUniversityProfile(null)}
        />
      )}
    </>
  );
}

export default Universities;
