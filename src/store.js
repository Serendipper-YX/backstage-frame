import { init } from '@rematch/core';
import * as models from './models';

export const creatStore = initialState =>init({
    models:{
        ...models
    },
    initialState:initialState,
    devtoolOptions: {
        disabled: process.env.NODE_ENV === 'production',
      },
})

const store = creatStore();

export default store;