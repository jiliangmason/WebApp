import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import './style.less';

export default class Item extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            commentState: 2  //0:未评价 1:正在评价 2:评价结束
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        this.setState({
            commentState: this.props.data.commentState //来自mock服务端数据
        })
    }

    showComment() {
        this.setState({
            commentState: 1 //点击评价中...
        })
    }

    hideComment() {
        this.setState({
            commentState: 0 //回到未评价状态
        })
    }

    /*
    * 点击提交按钮，对应order.jsx的submit函数
    * 参数： id 每个评论的id（后端获取）
    *       value: 用户输入的评论
    *       callback: 回调，改变评论状态
    * */
    submitHandler() {
        const id = this.props.data.id; //每个评论收藏的id，详见mock/user/user.js
        const textVal = this.refs.text.value.trim();
        if (!textVal) {
            return;
        }

        this.props.submitComment(id, textVal, this.commitDone.bind(this));
    }

    commitDone() {
        this.setState({
            commentState: 2
        })
    }

    render() {
        const data = this.props.data;
        const orderItem = this.state.commentState == 0 //未评价
        ? <button className="btn" onClick={this.showComment.bind(this)}>评价</button>
        : this.state.commentState == 1
            ? ''  //正在评价
            :<button className="btn unselected-btn">已评价</button>;  //已评价

        const comments = this.state.commentState == 1
        ? (<div className="comment-text-container">
                <textarea style={{width: "100%",height: "80px",marginTop:"5px", borderColor:"#ccc"}} ref="text"/>
                <button className="btn" onClick={this.submitHandler.bind(this)}>提交</button>
                &nbsp;
                <button className="btn unselected-btn" onClick={this.hideComment.bind(this)}>取消</button>
            </div>)
            :'';
        return (
            <div className="clear-fix order-item-container">
                <div className="order-item-img float-left">
                    <img src={data.img}/>
                </div>
                <div className="order-item-comment float-right">
                    {orderItem}
                </div>
                <div className="order-item-content">
                    <span>商户：{data.title}</span>
                    <span>数量：{data.count}</span>
                    <span>价格：￥{data.price}</span>
                </div>
                {comments}
            </div>
        )
    }

}