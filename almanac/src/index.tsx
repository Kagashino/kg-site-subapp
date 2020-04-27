import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.scss';

function bootstrap() {
  const subAppName = process.env.SUB_APP_NAME as string;
  const getContainer = () => document.getElementById(subAppName);
  const render = (container: HTMLElement | null) => ReactDOM.render(
    (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ),
    container
  );

  if (!getContainer()) {
    return render(document.getElementById('root'))
  }


  document.addEventListener(`LAUNCH_APP:${subAppName}`, ()=> {
    render(getContainer());
  });

  document.addEventListener(`CLOSE_APP:${subAppName}`, ()=>{
    const container: HTMLElement | null = getContainer();
    if (!container) {
      return;
    }
    ReactDOM.unmountComponentAtNode(container);
  })
}

bootstrap();
