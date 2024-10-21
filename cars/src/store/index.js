import { configureStore } from '@reduxjs/toolkit';
import { carsReducer, changeSearchTerm, addCar, removeCar } from './slices/carslice';
import { formReducer, changeName, changeCost } from './slices/formslice';

const store = configureStore({
    reducer: {
        cars: carsReducer,
        form: formReducer,
    },
});

export {
    store,
    changeSearchTerm,
    addCar,
    removeCar,
    changeName,
    changeCost,
};