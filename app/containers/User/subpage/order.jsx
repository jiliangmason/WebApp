import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import {getOrderListData, postComment} from '../../../fetch/user/order_fetch';
import OrderListItem from '../../../components/order_list_item/order_list_item';
import './style.less';

export default class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        const username = this.props.username;
        if (username) {
            let result = getOrderListData(username);
            result.then((response)=>response.json())
                .then((json)=> {
                    this.setState({
                        data: json
                    }, ()=> {
                        console.log(this.state.data)
                    });
                })
        }

    }

    //提交评价
    submitComment(id, value, callback) {
        const result = postComment(id, value);
        result.then(res=>res.json())
              .then(json=>{
                  if (json.errno === 0)  //已经评论成功
                  callback();
              }).catch(err=>{
                  console.log(err.message);
                })
    }

    render() {
        const orderList = this.state.data.length
            ? <OrderListItem data={this.state.data} submitComment={this.submitComment.bind(this)}/>
            : "";
        return (
            <div className="order-list-container">
                <h2>您的订单</h2>
                {orderList}
            </div>
        )
    }

}