import './public-path';
const promise = import('./index');
export const bootstrap = () => promise.then(m => m.bootstrap());
export const mount = props => promise.then(m => m.mount(props));
export const unmount = props => promise.then(m => m.unmount(props));
