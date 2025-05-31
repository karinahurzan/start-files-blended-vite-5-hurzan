import { exchangeCurrency } from "../../service/exchangeAPI";
import { getUserInfo } from "../../service/opencagedataApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBaseCurrency = createAsyncThunk('currency/fetchBaseCurrency',
    async (coords, thunkAPI) => {
        const state = thunkAPI.getState();
        const { baseCurrency } = state.currency;
        if (baseCurrency) {
            return thunkAPI.rejectWithValue('We have base currency')
        }
        try {
            const data = await getUserInfo(coords);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const fetchExchangeInfo = createAsyncThunk('currency/fetchExchangeInfo',
    async (credentials, thunkAPI) => {
        try {
            const data = await exchangeCurrency(credentials)
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.messae)
        }
    }
)