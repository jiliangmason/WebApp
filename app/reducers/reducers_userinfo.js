import * as ActionType from '../constants/user_info_list';

/*
   用户数据的处理规则
* action.data 和 action.type: 从userinfo_action中传来的数据
* state 是一个全局的状态树，也可以看做是一个对象
* state = {
*   cityName: xxx
*   username: yyy
* }
*
* */
const initialState = {};
export default function userinfoReducer(state=initialState, action) {
    //console.dir(state);
    switch (action.type) {
        case ActionType.USERINFO_LOGIN:
            return action.data;

        case ActionType.UPDATED_CITYNAME:
            return action.data;

        default:
            return state;
    }
}