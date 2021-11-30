import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import UniversityProfile from '.';

jest.mock('@fortawesome/react-fontawesome', () => (
  {
    __esModule: true,
    FontAwesomeIcon: () => <span />,
  }
));

jest.mock('./SubscribeForm', () => (
  function DummySubscribeForm() {
    return <div />;
  }
));

jest.mock('components/UrlChip', () => (
  function DummyUrlChip({ url }: { url: string }) {
    return <div data-testid="url-chip">{url}</div>;
  }
));

const university = {
  name: 'Name',
  country: 'Country',
  alpha_two_code: 'US',
  web_pages: ['http://website_1.com', 'http://website_2.com'],
};

test('given a university, when rendering, it should render the name', async () => {
  const onCloseClick = jest.fn();

  render(<UniversityProfile university={university} onCloseClick={onCloseClick} />);

  const element = await screen.findByTestId('name');

  expect(element).toHaveTextContent('Name');
});

test('given a university, when rendering, it should render the country', async () => {
  const onCloseClick = jest.fn();

  render(<UniversityProfile university={university} onCloseClick={onCloseClick} />);

  const element = await screen.findByTestId('country');

  expect(element).toHaveTextContent('Country');
});

test('given a university, when rendering, it should render the websites', async () => {
  const onCloseClick = jest.fn();

  render(<UniversityProfile university={university} onCloseClick={onCloseClick} />);

  const elements = await screen.findAllByTestId('url-chip');

  expect(elements.length).toBe(2);
  expect(elements[0]).toHaveTextContent('website_1.com');
  expect(elements[1]).toHaveTextContent('website_2.com');
});

test('given a university, when clicking navigate back button, it should invoke an external function', async () => {
  const onCloseClick = jest.fn();

  render(<UniversityProfile university={university} onCloseClick={onCloseClick} />);

  const element = await screen.findByTestId('nav-back-button');

  fireEvent.click(element);

  expect(onCloseClick).toBeCalled();
});
