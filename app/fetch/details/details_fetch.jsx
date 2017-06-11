import {getData} from '../get';

export function getInfoData(id) {
    let result = getData('/api/details/info/' + id);
    return result;
}

export function getCommentsData(page, id) {
    let result = getData('/api/details/comments/' + page + '/' + id);
    return result;
}