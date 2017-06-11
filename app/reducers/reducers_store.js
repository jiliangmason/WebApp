/**
 * Created by Administrator on 2017/6/6 0006.
 */
/*
* 1.state可以看做全局的一个数组
* 2.添加就是把新增数据添加在state数组的头部
* 3.删除类似，总之把state看做数组
* */
import * as actionType from '../constants/store';

const initialState = []; //要修改的是一个数组
export function storeReducer(state=initialState, action) {
    switch (action.type) {
        case actionType.STORE_UPDATE:
            return action.data;

        case actionType.STORE_ADD:
            state.unshift(action.data);
            return state;

        case actionType.STORE_REMOVE:
            return state.filter(item=>{
                if (item.id !== action.data.id) {
                    return item
                }
            });

        default:
            return state;
    }
}