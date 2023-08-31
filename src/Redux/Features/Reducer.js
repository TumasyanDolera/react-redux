import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toDoList: [],
    editTaskObj: null,
    checkedTasks:[],
 
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
        
        createTask(state, action) {
            state.toDoList = [...state.toDoList, action.payload]
        },

        putTask(state,action){
            let index = state.toDoList.findIndex((item) => item.id === action.payload.data.id);
            state.toDoList[index] = action.payload.data;
        },
        getEditTask(state, action) {
            state.editTaskObj = action.payload
        },
        saveCheckedTasks(state, action){
            if(state.checkedTasks.find((item)=>item === action.payload)){
                state.checkedTasks = state.checkedTasks.filter(item=>item !== action.payload)
           }
           else{
               state.checkedTasks = [...state.checkedTasks, action.payload];

           }
        },

        cleanCheckedTask(state){
            state.checkedTasks = [];
        },
     
    }

        

    })


export const {getAllTasks,removeSingleTask,createTask, putTask,getEditTask, saveCheckedTasks, cleanCheckedTask} = taskSlice.actions;
export default taskSlice.reducer;