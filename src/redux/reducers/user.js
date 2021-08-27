const authenticationUserUpdateLists = (lists) => {
    let updateLists = [];
    if (lists) {
        updateLists = lists.map(item => {
            if (!('toDoList' in item)) {
                return { ...item, toDoList: [] };
            } else {
                return item;
            }
        })
    }
    return updateLists;
}

export {
    authenticationUserUpdateLists
};