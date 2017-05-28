import React from 'react';
import {getHomeAd} from '../../../fetch/home/home_fetch';
import HomeAd from '../../../components/home_ad/home_ad';

export default class AdFavour extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        const res = getHomeAd();
        //console.log(res);
        res.then((response)=> {
            return response.json();
        }).then((json)=> {
            let data = json;
            //console.log(data);
            if (data.length) {
                this.setState({
                    data:data,  //从mock/home/ad.js获取的数据
                });
            }
        })
    }

    render() {
        let dataList = this.state.data.length
            ?<HomeAd data={this.state.data}/>
            :<div>加载中...</div>;

        return (
            <div>
                {dataList}
            </div>
        )
    }
}