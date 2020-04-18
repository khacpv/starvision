import {SAVE_PROFILE} from "../actions/AccountAction";

const initialState = {
    profile: {}
};

export default  function AccountReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_PROFILE:
            return {
                ...state,
                profile: action.params,
            };
        default :
            return state
    }
}
