import React from 'react';
import { render, screen, fireEvent, waitForElement, rerender, cleanup } from '@testing-library/react';
import App from '../../components/App/App';
import List from '../../components/List/List.js';
import { Provider } from '../../context/provider';
import { dataReducer } from '../../context/reducer.js';

afterEach(cleanup);

describe('App', () => {
  it('renders snapshot', () => {
    const { container } = render(
      <Provider>
        <App />
      </Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  // it('renders "Loading ..."', async () => {
  //   render(
  //     <Provider>
  //       <App />
  //     </Provider>
  //   );
  //
  //   fireEvent.click(screen.getByText('DRAGONS'));
  //
  //   expect(screen.getByText('Loading ...')).toBeInTheDocument();
  //
  //   screen.debug();
  //
  //   await waitForElement(() => {
  //     expect(screen.findByText(/Something is wrong/)).toBeInTheDocument()});
  // });
});
