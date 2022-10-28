import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    try{
        const res = await fetch('http://localhost:3030/fetchAllTasks', { method: 'GET' })
        const data = await res.json();
        return { tasks: data }
    }
    catch(e){
        console.log(e);
    }
   
})

export const fetchActiveTasks = createAsyncThunk('tasks/fetchActiveTasks', async () => {
    try{    
        const res = await fetch('http://localhost:3030/fetchActiveTasks', { method: 'GET' })
        const data = await res.json();
        return { tasks: data }
    }
    catch(e){
        console.log(e);
    }
})

export const addTasks = createAsyncThunk('tasks/addTasks', async (task) => {
    try{
        const res = await fetch('http://localhost:3030/addTask', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const data = await res.json();
        return { tasks: data }
    }
    catch(e){
        console.log(e);
    }
})

export const deleteTasks = createAsyncThunk('tasks/deleteTasks', async (id) => {
    try{
        await fetch(`http://localhost:3030/deleteTask/${id}`, { method: 'DELETE' })
        return { task: { id: id } }
    }
    catch(e){
        console.log(e);
    }
})

export const toggleStatus = createAsyncThunk('tasks/toggleStatus', async (id) => {
    try{
        await fetch(`http://localhost:3030/toggleStatus/${id}`, { method: 'PUT' })
        return { task: { id: id } }
    }
    catch(e){
        console.log(e);
    }
})

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {

    },
    extraReducers: {
        [fetchTasks.fulfilled]: (state, action) => {
            return action.payload.tasks;
        },
        [addTasks.fulfilled]: (state, action) => {
            state.push(action.payload.tasks);
        },
        [deleteTasks.fulfilled]: (state, action) => {
            state.filter((task) => task._id !== action.payload.task.id)
        },
        [toggleStatus.fulfilled]: (state, action) => {
            //const tasks = JSON.parse(JSON.stringify(state));
            const index = state.findIndex(
                (task) => task._id === action.payload.task.id
            );
            if(index!==-1){
                state[index].status=!state[index].status;
            }           
        },
        [fetchActiveTasks.fulfilled]: (state, action) => {
            return action.payload.tasks;
        },
    },
});

export default tasksSlice.reducer;