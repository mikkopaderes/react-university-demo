import React, { FormEvent, useState } from 'react';

import { doc, setDoc } from 'firebase/firestore';
import { useFirestore } from 'reactfire';

import UniversityData from 'data/university';
import styles from './index.module.css';

interface SubscribeFormProps {
  university: UniversityData;
}

function SubscribeForm({ university }: SubscribeFormProps) {
  const [email, setEmail] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const firestore = useFirestore();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const universityId = `${university.alpha_two_code}__${university.name}`.replaceAll(' ', '');

    try {
      await setDoc(doc(
        firestore,
        `universities/${universityId}/subscriptions`,
        email,
      ), { active: true });
      setFeedback('Successfully subscribed');
    } catch {
      setFeedback('You\'re already subscribed');
    } finally {
      setEmail('');
    }
  }

  return (
    <form className={styles.host} data-testid="form" onSubmit={handleSubmit}>
      <p className={styles.subscribeLabel}>
        Like this University? Subscribe to get updates from them.
      </p>

      <input
        className={styles.subscribeEmailField}
        data-testid="email-field"
        type="email"
        placeholder="you@email.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className={styles.subscribeButton} type="submit">Subscribe</button>

      {feedback && (
        <p className={styles.subscribeFeedback} data-testid="feedback">
          {feedback}
        </p>
      )}
    </form>
  );
}

export default SubscribeForm;
