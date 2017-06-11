import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import DetailsCommentList from '../../../components/details_comment_list/details_comment_list';
import LoadMore from '../../../components/load_more/load_more';
import {getCommentsData} from '../../../fetch/details/details_fetch';
import './style.less'

export default class DetailsComment extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            isLoadingMore: false,
            hasMore: false,
            page: 1
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    loadFirstPage() {
        let id = this.props.id;
        let res = getCommentsData(0, id);
        this.handleResult.call(this, res);
    }

    handleResult(res) {
        this.setState({
            isLoadingMore: true
        });

         res.then((response)=>response.json())
            .then((json)=>{
                 this.setState({
                     data: this.state.data.concat(json.data),
                     hasMore: json.hasMore
                 })
             });

        this.setState({
            isLoadingMore: false
        })
    }

    componentDidMount() {
        this.loadFirstPage();
    }

    loadMore() {
        let page = this.state.page;
        const id = this.props.id;
        this.setState({
            page: page+1
        });
        let res = getCommentsData(page, id);
        this.handleResult(res);
    }

    render() {
        const loading = this.state.hasMore
        ? <LoadMore loadMore={this.loadMore.bind(this)} isLoadingMore={this.state.isLoadingMore}/>
        : "没有内容了~";
        return (
            <div className="detail-comment-subpage">
                <h2>用户点评</h2>
                <DetailsCommentList data={this.state.data}/>
                {loading}
            </div>
        )
    }

}