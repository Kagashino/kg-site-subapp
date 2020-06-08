import React from 'react';
import ReactDOM from 'react-dom';
import { bootstrap } from 'kg-site-subapp-controller';
import App from './App';

const subAppName = process.env.SUB_APP_NAME as string;


bootstrap(subAppName, {
  onLaunch(container) {
    ReactDOM.render(
      (
        <React.StrictMode>
          <App subAppName={subAppName} />
        </React.StrictMode>
      ),
      container
    );
  },
  onClose(container) {
    if (!container) {
      return;
    }
    ReactDOM.unmountComponentAtNode(container);
  },
  fallback() {
    ReactDOM.render(
      (
        <React.StrictMode>
          <App subAppName={subAppName} />
        </React.StrictMode>
      ),
      document.getElementById('root')
    );
  }
});
