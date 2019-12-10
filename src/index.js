import './css/normalize.css';
import './css/index.css';

const path = window.location.pathname;

if (path === '/sketch/' || path === '/sketch') {
  require('./sketch');
}
