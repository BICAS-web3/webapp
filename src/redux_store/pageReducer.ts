import { createSlice,PayloadAction } from "@reduxjs/toolkit";

type Obj = {
  activeObject: string,
  objects: string[],
  status: string[],
}

const initialState: Obj = {
  activeObject: "Home",
  objects: ["Home", "Mini-Games", "NFT Market"],
  status: ["active", "inactive", "inactive"],
}

const pageReducer = createSlice({
  name: 'page',
  initialState,
  reducers:{
    changeState(state,action:PayloadAction<number>) {
      state.activeObject = state.objects[action.payload]
      state.status = ["inactive", "inactive", "inactive"];
      state.status[action.payload] = "active";
    },
  }
})

export const {changeState} = pageReducer.actions;

export default pageReducer.reducer;