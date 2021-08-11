const initialState = {
    user: false,
    loading: true,
    activeToDoListId: null,
    lists: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_USER": {
            return {
                ...state,
                user: action.payload
            }
        }

        case "UPDATE_LOADING": {
            return {
                ...state,
                loading: action.payload
            }
        }

        case "UPDATE_ACTIVE_TODO_LIST_ID": {
            return {
                ...state,
                activeToDoListId: action.payload
            }
        }

        case "UPDATE_LISTS": {
            return {
                ...state,
                lists: action.payload
            }
        }

        case "ADD_TODO_LIST": {
            return {
                ...state,
                lists: [...state.lists, action.payload]
            }
        }

        case "AUTHENTICATION_USER": {
            return {
                ...state,
                user: action.userId,
                lists: action.lists,
                activeToDoListId: action.activeToDoListId,
                loading: action.loading
            }
        }

        case "SIGN_IN_ACCOUNT": {
            return {
                ...state,
                user: action.userId,
                lists: action.lists,
                activeToDoListId: null,
            }
        }

        case "SIGN_OUT_ACCOUNT": {
            return {
                ...state,
                user: false,
                lists: action.lists,
                activeToDoListId: null,
            }
        }

        case "DELETE_TODOLIST": {
            return {
                ...state,
                activeToDoListId: null,
                lists: action.lists
            }
        }

        case "UPDATE_TODO_LIST_LABEL": {
            return {
                ...state,
                lists: action.payload
            }
        }

        case "ADD_SUB_TASK": {
            return {
                ...state,
                lists: action.payload
            }
        }

        default:
            return state
    }
};

export default reducer;