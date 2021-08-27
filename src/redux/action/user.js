import {
    AUTHENTICATION_USER,
    SIGN_OUT_ACCOUNT,
    SIGN_IN_ACCOUNT
} from '../constans';

const authenticationUserAC = (userId, lists, activeToDoListId, loading, recycleBin) => {
    return {
        type: AUTHENTICATION_USER,
        userId,
        lists,
        activeToDoListId,
        loading,
        recycleBin
    }
}

const signOutAccountAC = (lists) => {
    return {
        type: SIGN_OUT_ACCOUNT,
        lists
    }
}

const signInAccountAC = (userId, lists) => {
    return {
        type: SIGN_IN_ACCOUNT,
        userId,
        lists
    }
}

export {
    authenticationUserAC,
    signOutAccountAC,
    signInAccountAC
}