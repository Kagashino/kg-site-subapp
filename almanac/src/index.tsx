import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.scss';

function bootstrap() {

  const getContainer = () => document.getElementById(process.env.SUB_APP_NAME);

  if (!getContainer()) {
    return ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

  document.addEventListener('LAUNCH_APP:kg-site-almanac', ()=> {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      getContainer(),
    );
  });

  document.addEventListener('CLOSE_APP:kg-site-almanac', ()=>{
    const container: HTMLElement | null = getContainer();
    if (!container) {
      return;
    }
    ReactDOM.unmountComponentAtNode(container);
  })
}

bootstrap();
