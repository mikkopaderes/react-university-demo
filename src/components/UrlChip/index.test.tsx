import React from 'react';
import { render, screen } from '@testing-library/react';

import WebsiteChip from '.';

test('given a url, when rendering, it should render just the hostname', async () => {
  const url = 'https://website.com';

  render(<WebsiteChip url={url} />);

  const element = await screen.findByTestId('url');

  expect(element).toHaveTextContent('website.com');
});
