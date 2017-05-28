/**
 * Created by Administrator on 2017/5/16 0016.
 */
import * as ActionType from '../constants/user_info_list';

/*
用户信息数据
* 1.该函数相当与dispatch action到reducer
* 2.在reducers中的action.type action.data就是这里的type和data
* */

export function login(data) {
    return {
        type: ActionType.USERINFO_LOGIN,
        data /*这里是es6对象属性速写，相当于data: data*/
    }
}

export function updateCityName(data) {
    return {
        type: ActionType.UPDATED_CITYNAME,
        data
    }
}

