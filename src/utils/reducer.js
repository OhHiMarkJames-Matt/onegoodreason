import { ACTIONS } from "./actions";

export const reducer = (state, action) => {
    switch(action.type){
        case ACTIONS.SET_IS_MODAL_TOGGLED:
            return {...state, isModalToggled : action.payload}
        default:
            throw new Error();
    }
}