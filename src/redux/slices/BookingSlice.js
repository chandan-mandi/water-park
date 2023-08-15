import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import swal from "sweetalert";

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async () => {
        const response = await fetch("http://localhost:5050/reviews")
            .then((res) => res.json())
        return response;
    }
)
// FETCH ALL RIDES
export const fetchRides = createAsyncThunk(
    'rides/fetchRides',
    async () => {
        const response = await fetch("http://localhost:5050/rides")
            .then((res) => res.json())
        return response;
    }
)
// FETCH ALL RIDES
export const fetchPackages = createAsyncThunk(
    'packages/fetchPackages',
    async () => {
        const response = await fetch("http://localhost:5050/packages")
            .then((res) => res.json())
        return response;
    }
)
export const postPackageBooking = createAsyncThunk(
    "booking/postPackageBooking",
    async (data) => {
        const loading = toast.loading("Loading...");
        const response = await axios.post("http://localhost:5050/booking", data)
            .then(res => {
                if (res.data.insertedId) {
                    toast.dismiss(loading);
                    swal("Booking Successful!", "Your Booking has been successfully completed.", "success");
                }
            })
        return response;
    }
)
// Add NEW SERVICE 
export const addNewRide = createAsyncThunk(
    'rides/postNewRide',
    async (data) => {
        const loading = toast.loading("Loading...")
        const response = await axios.post("http://localhost:5050/rides", data)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Added', {
                        id: loading,
                    });
                    return swal("Successfully Added!", "Your service has been successfully added.", "success");
                }
            })
        return response;
    }
)
// FET ALL ORDER
export const fetchAllOrders = createAsyncThunk(
    'order/fetchAllOrders',
    async (headers) => {
        const response = await fetch("http://localhost:5050/booking", headers)
            .then(res => res.json())
        return response;
    }
)
// DELETE SINGLE ORDER
export const deleteOrder = createAsyncThunk(
    'order/deleteOrder',
    async (id) => {
        const loading = toast.loading("Loading...")
        const response = await axios.delete(`http://localhost:5050/booking/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success('Deleted', {
                        id: loading,
                    });
                    return swal("Successfully Cancelled!", "Your Order has been successfully Cancelled.", "success");
                }
            }).catch(err => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true })
            })
        return response;
    }
)
// DELETE RIDE 
export const deleteRide = createAsyncThunk(
    'rides/deleteRide',
    async (id) => {
        const response = await axios.delete(`http://localhost:5050/rides/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success('Ride Deleted')
                        .catch(err => {
                            swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true })
                        })
                }
            })
        return response;
    }
)
const bookingSlice = createSlice({
    name: "bookings",
    initialState: {
        bookingList: [],
        reviews: [],
        rides: [],
        packages: [],
        myOrder: [],
        allOrders: [],

    },
    reducers: {
        addToBookingList: (state, action) => {
            state.bookingList.push(action.payload)
        },
        removeFromAllOrders: (state, action) => {
            state.allOrders = state.allOrders.filter(product => product._id !== action.payload)
        },
        addToAllOrder: (state, action) => {
            state.allOrders.forEach(order => {
                console.log(action.payload);
                if (order._id === action.payload.id) {
                    order.status = action.payload.status;
                }
                state.allOrders.push(order)
            })
        },
        removeFromRide: (state, action) => {
            state.rides = state.rides.filter(ride => ride._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchReviews.fulfilled, (state, action) => {
            state.reviews = action.payload;
        });
        builder.addCase(fetchRides.fulfilled, (state, action) => {
            state.rides = action.payload;
        });
        builder.addCase(addNewRide.fulfilled, (state, action) => {
            state.rides.push(action.payload);
        });
        builder.addCase(fetchPackages.fulfilled, (state, action) => {
            state.packages = action.payload;
        });
        builder.addCase(postPackageBooking.fulfilled, (state, action) => {
            state.bookingList.push(action.payload);
        });
        builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.allOrders = action.payload;
        });
        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            state.myOrder = state.myOrder.filter(order => order._id !== action.payload);
        });
        builder.addCase(deleteRide.fulfilled, (state, action) => {
            state.rides = state.rides.filter(ride => ride._id !== action.payload)
        });
    }
})

export const { addToBookingList, removeFromRide, removeFromAllOrders, addToAllOrder } = bookingSlice.actions;
export default bookingSlice.reducer;