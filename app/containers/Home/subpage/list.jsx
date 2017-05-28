import React from 'react';
import {getHomeList} from '../../../fetch/home/home_fetch';
import './style.less';
import HomeItemList from '../../../components/home_list_item/home_list';
import LoadMore from '../../../components/load_more/load_more';

export default class HomeList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            hasMore: false, //true: 有数据加载  false: 无数据  由服务端发送
            isLoadingMore: false, //判断加载状态是 true:正在加载....（还没加载完） 还是 false:加载更多（已经完成）
            page: 1 //下一页的页码
        }
    }

    componentDidMount() {
        this.LoadFirstPageData.call(this);
    }

    LoadFirstPageData() {
        const cityName = this.props.cityName;
        const res = getHomeList(cityName, 0);
        //console.log(res);
        this.handleData(res);
    }

    LoadMoreData() {
        this.setState({
            isLoadingMore:true //正在加载中...
        });
        const cityName=this.props.cityName;
        const page = this.state.page;
        const res=getHomeList(cityName,page);

        this.handleData(res);

        this.setState({
            isLoadingMore:false, //加载完成
            page: page+1
        })
    }

    handleData(res) {
        res.then((response)=> {
            return response.json();  //一定要写return
        }).then((json)=> {
            this.setState({
                data: this.state.data.concat(json.data),
                hasMore: json.hasMore //json.hasMore来自服务端
            })
        }).catch(err=>console.log(err))
    }


    render() {
        const dataList = this.state.data.length
            ? <HomeItemList data={this.state.data}/>
            : "正在加载中...";
        const loadMoreList = this.state.hasMore
            ?  <LoadMore isLoadingMore={this.state.isLoadingMore} loadMore={this.LoadMoreData.bind(this)}/>
            : "";
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                {dataList}
                {loadMoreList}
            </div>
        )
    }
}