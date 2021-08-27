
import {
    RESTORE_ITEM,
    DESTROY_ITEM,
    UPDATE_ITEM_IN_RECYCLE_BIN
} from '../constans';

const restoreItemAC = (item, itemType) => {
    return {
        type: RESTORE_ITEM,
        item,
        itemType
    }
}

const destroyItemAC = (item, itemType) => {
    return {
        type: DESTROY_ITEM,
        item,
        itemType
    }
}

const updateItemInRecycleBinAC = (item, itemType) => {
    return {
        type: UPDATE_ITEM_IN_RECYCLE_BIN,
        item,
        itemType
    }
}

export {
    restoreItemAC,
    destroyItemAC,
    updateItemInRecycleBinAC
}