import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { IInvite, IRoom } from '../../types/data';

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
    updateInvite: (state, action: PayloadAction<IInvite | undefined>) => {
      if (state.value) {
        state.value.invite = action.payload;
      }
    },
    setRoom: (state, action: PayloadAction<IRoom | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setRoom, updateInvite } = roomSlice.actions;

export default roomSlice.reducer;
