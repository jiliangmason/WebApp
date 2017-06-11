import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import LoadMore from '../../../components/load_more/load_more';
import {connect} from 'react-redux';
import {getSearchList} from '../../../fetch/search/search_fetch';
import HomeItemList from '../../../components/home_list_item/home_list';

class SearchList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            hasMore: false,
            isLoadingMore: false,
            page: 1
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        this.loadFirstPage.call(this);
    }

    loadFirstPage() {
        const city = this.props.usersearch.cityName;
        const category = this.props.category;
        const keyword = this.props.keyword;
        let result = getSearchList(city, 0, category, keyword);
        this.handleResult(result);
    }

    handleResult(res) {
        res.then((response)=>response.json())
            .then((json)=> {
                this.setState({
                    data: this.state.data.concat(json.data),
                    hasMore: json.hasMore
                })
            })
            .catch(err=>{
                if(__DEV__) {
                    console.error('搜索页面出错', err.message);
                }
            })
    }

    LoadMoreData() {
        const city = this.props.usersearch.cityName || ""; //使用了redux的cityName
        const category = this.props.category;
        const keyword = this.props.keyword;

        this.setState({
            isLoadingMore: true
        });

        let page = this.state.page;
        let result = getSearchList(city, page, category, keyword);
        this.handleResult(result);

        this.setState({
            isLoadingMore: false,
            page: page + 1
        });
    }

    componentDidUpdate(prevProps, prevState) {
        /*console.log(124);
        console.log(prevState);
        console.log(prevProps.keyword);
        console.log(prevProps.category);
        1.只要props和state发生改变就进入这个函数,
        2.在当前页继续搜索时，可以调用该函数
        */
        const props = this.props;
        if(props.keywords == prevProps.keywords && props.category == prevProps.category) {
            return;
        }
        this.setState({
            data: [],
            hasMore: false,
            isLoadingMore: false,
            page: 1
        });

        this.loadFirstPage();
    }


    render() {
        const dataList = this.state.data.length
            ? <HomeItemList data={this.state.data}/>
            : "正在加载中...";
        const loadMoreList = this.state.hasMore
            ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMore={this.LoadMoreData.bind(this)}/>
            : "";
        return (
            <div>
                {dataList}
                {loadMoreList}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        usersearch: state.userinfoReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);