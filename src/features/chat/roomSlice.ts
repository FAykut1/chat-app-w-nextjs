import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { IRoom } from '../../types/data';

// Define a type for the slice state
interface RoomState {
  value: IRoom | null;
}

// Define the initial state using that type
const initialState: RoomState = {
  value: null,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<IRoom | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setRoom } = roomSlice.actions;

export default roomSlice.reducer;
