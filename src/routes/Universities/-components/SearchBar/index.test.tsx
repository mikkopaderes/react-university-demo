import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import SearchBar from '.';

jest.mock('@fortawesome/react-fontawesome', () => (
  {
    __esModule: true,
    FontAwesomeIcon: () => <span />,
  }
));

test('given a query, when rendering, it should render the query value', async () => {
  const query = 'Query';
  const country = '';
  const onChange = jest.fn();

  render(<SearchBar
    query={query}
    country={country}
    onChange={onChange}
  />);

  const element = await screen.findByTestId('search-field');

  expect(element).toHaveValue('Query');
});

test('given a rendered component, when changing the search field, it should trigger an external action', async () => {
  const query = '';
  const country = '';
  const onChange = jest.fn();

  render(<SearchBar
    query={query}
    country={country}
    onChange={onChange}
  />);

  const element = await screen.findByTestId('search-field');

  fireEvent.change(element, { target: { value: 'Test Query' } });

  expect(onChange).toBeCalledTimes(1);
  expect(onChange).toBeCalledWith('query=Test+Query');
});

test('given a country, when rendering, it should render the country value', async () => {
  const query = '';
  const country = 'Philippines';
  const onChange = jest.fn();

  render(<SearchBar
    query={query}
    country={country}
    onChange={onChange}
  />);

  const element = await screen.findByTestId('country-field') as HTMLSelectElement;

  expect(element).toHaveValue('Philippines');
});

test('given a rendered component, when changing the country field, it should trigger an external action', async () => {
  const query = '';
  const country = '';
  const onChange = jest.fn();

  render(<SearchBar
    query={query}
    country={country}
    onChange={onChange}
  />);

  const element = await screen.findByTestId('country-field');

  fireEvent.change(element, { target: { value: 'Philippines' } });

  expect(onChange).toBeCalledTimes(1);
  expect(onChange).toBeCalledWith('country=Philippines');
});
