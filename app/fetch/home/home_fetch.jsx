import {getData} from '../get';

export function getHomeAd() {
    const result = getData('/api/homead');
    return result;
}

export function getHomeList(city, page) {
    const result = getData('/api/homelist/'+ encodeURIComponent(city)+'/'+page);
    return result;
}