import {getData} from '../get';

export function getSearchList(city, page, category, keyword) {
    let keywordStr = keyword ? "/" + keyword : "";
    const result = getData('/api/search' + '/' + page + '/' + city + '/' + category + keywordStr);
    return result;
}