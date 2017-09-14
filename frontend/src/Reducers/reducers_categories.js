import * as ActionConstants from "../Constants/ActionConstants";

export default function(state=[], action) {
    switch(action.type){
        case ActionConstants.GET_ALL_CATEGORIES:
            return action.data;
        default:
            return state;
    }
}