import './index.scss';


import { App } from './app';

const app = new App();

window.onload = () => {
  document.body.append(app.element);
};