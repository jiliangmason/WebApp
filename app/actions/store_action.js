/**
 * Created by Administrator on 2017/6/6 0006.
 */
import * as actionType from '../constants/store';

export function updateStore(data) {
    return {
        type: actionType.STORE_UPDATE,
        data
    }
}

export function addStore(item) {
    return {
        type: actionType.STORE_ADD,
        data: item
    }
}

export function removeStore(item) {
    return {
        type: actionType.STORE_REMOVE,
        data: item
    }
}