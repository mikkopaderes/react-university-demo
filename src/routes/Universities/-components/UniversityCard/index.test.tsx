import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import UniversityCard from '.';

jest.mock('components/UrlChip', () => (
  function DummyUrlChip({ url }: { url: string }) {
    return <div data-testid="url-chip">{url}</div>;
  }
));

let university = {
  name: 'Name',
  country: 'Country',
  alpha_two_code: 'US',
  web_pages: ['http://website_1.com', 'http://website_2.com'],
};

beforeEach(() => {
  university = {
    name: 'Name',
    country: 'Country',
    alpha_two_code: 'US',
    web_pages: ['http://website_1.com', 'http://website_2.com'],
  };
});

test('given a university, when rendering, it should render the name', async () => {
  const onClick = jest.fn();

  render(<UniversityCard university={university} onClick={onClick} />);

  const element = await screen.findByTestId('name');

  expect(element).toHaveTextContent('Name');
});

test('given a university, when rendering, it should render the country', async () => {
  const onClick = jest.fn();

  render(<UniversityCard university={university} onClick={onClick} />);

  const element = await screen.findByTestId('country');

  expect(element).toHaveTextContent('Country');
});

test('given a university, when rendering, it should render the web pages', async () => {
  const onClick = jest.fn();

  render(<UniversityCard university={university} onClick={onClick} />);

  const elements = await screen.findAllByTestId('url-chip');

  expect(elements.length).toBe(2);
  expect(elements[0]).toHaveTextContent('website_1.com');
  expect(elements[1]).toHaveTextContent('website_2.com');
});

test('given a university, when clicking the card, it should trigger an external action', async () => {
  const onClick = jest.fn();

  render(<UniversityCard university={university} onClick={onClick} />);

  const element = await screen.findByTestId('primary-action-button');

  fireEvent.click(element);

  expect(onClick).toBeCalledTimes(1);
  expect(onClick).toBeCalledWith(university);
});
