import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Universities from '.';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@fortawesome/react-fontawesome', () => (
  {
    __esModule: true,
    FontAwesomeIcon: () => <span />,
  }
));

jest.mock('./-components/UniversityCard', () => (
  function DummyUniversityCard() {
    return <div data-testid="university" />;
  }
));

test('given a universities page, when on first render, it should not show any university', () => {
  render(
    <BrowserRouter>
      <Universities />
    </BrowserRouter>
  );

  const elements = screen.queryAllByTestId('university');

  expect(elements.length).toBe(0);
});

test('given a universities page, when searching, it should show university per search result', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        {
          name: 'University 1',
          country: 'Country 1',
          web_pages: ['http://web_page_1.com'],
        },
        {
          name: 'University 2',
          country: 'Country 2',
          web_pages: ['http://web_page_2.com'],
        },
      ]),
    }),
  ) as jest.Mock;

  render(
    <BrowserRouter>
      <Universities />
    </BrowserRouter>
  );

  const element = await screen.findByTestId('search-field');

  fireEvent.change(element, { target: { value: 'Univ' } });

  const elements = await screen.findAllByTestId('university');

  expect(elements.length).toBe(2);
});
