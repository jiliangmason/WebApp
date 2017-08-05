import React from 'react';
import './style.less';

export default class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    handleLoadMore() {
        this.props.loadMore();
    }

    componentDidMount() {
        const loadMoreFn = this.props.loadMore;
        let timeId = null;
        const loadBtn = this.refs.loading;
        //console.log(this.refs.loading);  //获取DOM元素时需要ref="字符串"

        function callback() {
            let loadingHeight = loadBtn.getBoundingClientRect().top; //加载按钮距离屏幕的高度
            //console.log(loadingHeight);
            let windowHeight = document.documentElement.clientHeight; //屏幕高度
            //console.log(windowHeight);

            /*
            * 当前高度小于屏幕高度，加载
            * */
            if (loadingHeight && loadingHeight < windowHeight) {
                loadMoreFn();
            }
        }

        window.addEventListener('scroll', function () {
            if (this.props.isLoadingMore) {
                return;
            }
            if (timeId) {
                clearTimeout(timeId); //先清理上一次的timeId
            }

            timeId = setTimeout(callback, 50);   //采用延时来减少移动产生大量动作
            //callback();
        }.bind(this), false)
    }

    render() {
        const loadDataList = this.props.isLoadingMore
            ? <span>正在加载...</span>
            : <span onClick={this.handleLoadMore.bind(this)}>加载更多</span>;
        return (
            <div className="load-more" ref={"loading"}>
                {loadDataList}
            </div>
        )
    }
}