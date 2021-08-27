const updateNotification = (recycleBin, notification) => {

    if (recycleBin.tasks.length + recycleBin.lists.length + recycleBin.subtasks.length >= 30) {
        return {
            status: true,
            text: 'Корзина переполнена',
            color: 'warning'
        }
    }

    return notification;
};

export {
    updateNotification
}