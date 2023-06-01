import {createStore} from 'redux'
 

const initialState={
    user:{login:null},
    admin:{login:null},
    mechanic:{login:null},
    refresh:true
}

function reducer(state=initialState, action){
    switch(action.type){
        case 'user': return {...state, user:action.payload};
        case 'admin': return {...state, admin:action.payload};
        case 'mechanic': return {...state, mechanic:action.payload};
        case 'refresh': return {...state, refresh:!state.refresh};
        default: return state;
    }

}

export default createStore(reducer)