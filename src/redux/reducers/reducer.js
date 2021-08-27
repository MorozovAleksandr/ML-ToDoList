
import { updateToDoListLabel, deleteToDoList, addToDoList, updateActiveListBeforeDelete } from './lists';
import { addTask, deleteTask, togglePropertyTask, updatingEditedTask, updateDateOrTimeTask } from './tasks';
import { addSubTask, updateDateOrTimeSubTask, workWithSubTask } from './subtasks';
import { addItemToRecycleBin, restoreItem, removeItemRecycleBin, updateItemInRecycleBin, updateRecycleBinFromDB } from './recyclebin';
import { updateFiltersBeforeDeleteList, updateFilters } from './filters';
import { initialState, initialFilters } from './shared';
import { authenticationUserUpdateLists } from './user';
import { updateNotification } from './notification';
import {
    UPDATE_ACTIVE_TODO_LIST_ID,
    ADD_TODO_LIST,
    UPDATE_TODO_LIST_LABEL,
    UPDATE_LISTS,
    DELETE_TODO_LIST,
    ADD_TASK,
    DELETE_TASK,
    TOGGLE_PROPERTY_TASK,
    UPDATING_EDITED_TASK,
    UPDATE_DATE_OR_TIME_TASK,
    ADD_SUB_TASK,
    UPDATE_DATE_OR_TIME_SUB_TASK,
    WORK_WITH_SUB_TASK,
    RESTORE_ITEM,
    DESTROY_ITEM,
    UPDATE_ITEM_IN_RECYCLE_BIN,
    AUTHENTICATION_USER,
    SIGN_OUT_ACCOUNT,
    SIGN_IN_ACCOUNT,
    CLEAR_NOTIFICATION,
    TOGGLE_FILTER,
    OFF_FILTER
} from '../constans';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ACTIVE_TODO_LIST_ID: {
            return {
                ...state,
                activeToDoListId: action.payload,
                filters: initialFilters
            }
        }

        case UPDATE_TODO_LIST_LABEL: {
            return {
                ...state,
                lists: updateToDoListLabel(state.lists, action.id, action.label),
            }
        }

        case DELETE_TODO_LIST: {
            return {
                ...state,
                lists: deleteToDoList(state.lists, action.id, state.recycleBin),
                activeToDoListId: updateActiveListBeforeDelete(state.activeToDoListId, action.id),
                recycleBin: addItemToRecycleBin(state, action.id, "list"),
                notifacation: updateNotification(state.recycleBin, state.notifacation),
                filters: updateFiltersBeforeDeleteList(state.activeToDoListId, action.id, state.filters)
            }
        }

        case UPDATE_LISTS: {
            return {
                ...state,
                lists: action.payload
            }
        }

        case ADD_TODO_LIST: {
            return {
                ...state,
                lists: addToDoList(state.lists, action.payload)
            }
        }

        case AUTHENTICATION_USER: {
            return {
                ...state,
                user: action.userId,
                lists: authenticationUserUpdateLists(action.lists),
                activeToDoListId: action.activeToDoListId,
                loading: action.loading,
                recycleBin: updateRecycleBinFromDB(action.recycleBin)
            }
        }

        case SIGN_IN_ACCOUNT: {
            return {
                ...state,
                user: action.userId,
                lists: action.lists,
                activeToDoListId: null,
            }
        }

        case SIGN_OUT_ACCOUNT: {
            return {
                ...state,
                user: false,
                lists: action.lists,
                activeToDoListId: null,
                recycleBin: {
                    lists: [],
                    tasks: [],
                    subtasks: []
                }
            }
        }

        case ADD_TASK: {
            return {
                ...state,
                lists: addTask(state, action.label)
            }
        }

        case DELETE_TASK: {
            return {
                ...state,
                lists: deleteTask(state, action.id),
                recycleBin: addItemToRecycleBin(state, action.id, "task"),
                notifacation: updateNotification(state.recycleBin, state.notifacation)
            }
        }

        case TOGGLE_PROPERTY_TASK: {
            return {
                ...state,
                lists: togglePropertyTask(state, action.id, action.property)
            }
        }

        case UPDATING_EDITED_TASK: {
            return {
                ...state,
                lists: updatingEditedTask(state, action.id, action.label)
            }
        }

        case UPDATE_DATE_OR_TIME_TASK: {
            return {
                ...state,
                lists: updateDateOrTimeTask(state, action.id, action.date, action.time)
            }
        }

        case ADD_SUB_TASK: {
            return {
                ...state,
                lists: addSubTask(state, action.taskId, action.label)
            }
        }

        case UPDATE_DATE_OR_TIME_SUB_TASK: {
            return {
                ...state,
                lists: updateDateOrTimeSubTask(state, action.id, action.taskId, action.date, action.time)
            }
        }

        case WORK_WITH_SUB_TASK: {
            return {
                ...state,
                lists: workWithSubTask(state, action.id, action.taskId, action.property, action.label),
                recycleBin: addItemToRecycleBin(state, action.id, "subtask", action.taskId, action.property, action.label),
                notifacation: updateNotification(state.recycleBin, state.notifacation)
            }
        }

        case RESTORE_ITEM: {
            return {
                ...state,
                lists: restoreItem(state.lists, action.item, action.itemType),
                recycleBin: removeItemRecycleBin(state.recycleBin, action.item, action.itemType)
            }
        }

        case DESTROY_ITEM: {
            return {
                ...state,
                recycleBin: removeItemRecycleBin(state.recycleBin, action.item, action.itemType)
            }
        }

        case UPDATE_ITEM_IN_RECYCLE_BIN: {
            return {
                ...state,
                recycleBin: updateItemInRecycleBin(state.recycleBin, action.item, action.itemType)
            }
        }

        case CLEAR_NOTIFICATION: {
            return {
                ...state,
                notifacation: {
                    status: false,
                    text: '',
                    color: 'success'
                }
            }
        }

        case TOGGLE_FILTER: {
            return {
                ...state,
                filters: updateFilters(state.filters, action.filter)
            }
        }

        case OFF_FILTER: {
            return {
                ...state,
                filters: updateFilters(state.filters, action.filter, true)
            }
        }

        default:
            return state
    }
};

export default reducer;