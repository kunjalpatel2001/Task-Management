import { createSlice } from '@reduxjs/toolkit'
let user = {
    token: null,
    email: null,
    firstName: null,
    id: null,
    lastName: null,
    parents: [],
    role: null,
    slackId: null,
    userName: null,
    bio: null,
}

export const userdata = createSlice({
    name: 'userdata',
    initialState: user,
    reducers: {
        setuser: (state, action) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.id = action.payload.id;
            state.lastName = action.payload.lastName;
            state.parents = action.payload.parents;
            state.role = action.payload.role;
            state.slackId = action.payload.slackId;
            state.userName = action.payload.userName;
            state.bio = action.payload.bio;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setuser } = userdata.actions

export default userdata.reducer