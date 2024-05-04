import('./index');
export const bootstrap = () => promise.then(m => m.bootstrap());
export const mount = () => promise.then(m => m.mount());
export const unmount = () => promise.then(m => m.unmount());
import './public-path';
