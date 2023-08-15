import { configureStore } from "@reduxjs/toolkit";
import BookingSlice from "./slices/BookingSlice";

export const store = configureStore({
    reducer: {
        booking: BookingSlice,
    }
})
