import { createSlice } from "@reduxjs/toolkit"
import { fetchBaseCurrency, fetchExchangeInfo } from "./operations";

const initialState = {
    baseCurrency: '',
    isLoading: false,
    isError: null,
    exchangeInfo: null
}

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setBaseCurrency: (state, { payload }) => {
            state.baseCurrency = payload;
        }
    },
    extraReducers: (builder) =>
        builder.addCase(fetchBaseCurrency.fulfilled, (state, { payload }) => {
            state.baseCurrency = payload;
        }).addCase(fetchExchangeInfo.pending, (state) => {
            state.isLoading = true;
            state.isError = null;
        }).addCase(fetchExchangeInfo.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.exchangeInfo = payload
        }).addCase(fetchExchangeInfo.rejected, (state, { payload }) => {
            state.isError = payload;
            state.isLoading = false;
            state.exchangeInfo = null;
        }),

})

export const { setBaseCurrency } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;