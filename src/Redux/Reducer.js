import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toDoList: []
}
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        getAllTasks(state, action) {
            state.toDoList = [...action.payload]
        },

        removeSingleTask(state, action){
            state.toDoList =  state.toDoList.filter(item => action.payload !== item.id)
        },
        
        addSingleTask(state, action){
            state.toDoList =  state.toDoList.filter(item => action.payload !== item.id)
        }

    }


})


export const {getAllTasks,removeSingleTask,addSingleTask} = taskSlice.actions;
export default taskSlice.reducer;