import { configureStore } from '@reduxjs/toolkit'
import userdata from './reducers/reducers'
export default configureStore({
    reducer: {
        userdata: userdata,
    },
})