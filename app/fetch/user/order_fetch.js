/**
 * Created by Administrator on 2017/6/8 0008.
 */
import {getData} from '../get';
import {postData} from '../post';

export function getOrderListData(username) {
    return getData('/api/orderlist/' + username);
}

export function postComment(id, comment) {
    return postData('/api/submitComment', {
        id: id,
        comment: comment
    });
}