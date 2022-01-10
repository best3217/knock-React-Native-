import { createStore } from 'redux';

import rootReducer from './reducers';
import { initUserFromStorage } from './hooks';

const store = createStore(rootReducer);

(async function InitStateFromStorage() {
    await initUserFromStorage(store.dispatch);
})();

export default store;
