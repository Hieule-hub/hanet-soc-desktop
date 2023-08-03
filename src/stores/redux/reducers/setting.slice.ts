import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SettingState {
    theme: string;
    grid: number;
}

const initialState: SettingState = {
    theme: '',
    grid: 5
};

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<string>) => {
            if (action.payload) {
                state.theme = action.payload;
            }
        },
        setGrid: (state, action: PayloadAction<number>) => {
            state.grid = action.payload;
        }
    }
});

export const { changeTheme, setGrid } = settingSlice.actions;

const setting = settingSlice.reducer;

export default setting;
