import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import * as storeActionFormList from '../../../actions/store_action';
import BuyAndStore from '../../../components/buy_store/buy_store';

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isStore: false //当前页面是否收藏
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount () {
        //console.log(123, this.props.store);
        //console.log(456, this.props.storeActions);
        this.checkStoreState();
    }

    buyHandler() {
        const loginFlag = this.loginCheck();
        if (!loginFlag) {
            return;
        } //验证是否登陆

        //购买流程，省略...

        hashHistory.replace('/user');
    }

    /*
    * 收藏事件：
    * 1.更新
    * 2.删除
    * 3.添加
    * */
    storeHandler() {
        const loginFlag = this.loginCheck();
        if (!loginFlag) {
            return;
        }

        const id = this.props.id;
        const actions = this.props.storeActions;

        if (this.state.isStore) {
            actions.removeStore({id: id});
        } //已经收藏，点击取消
        else {
            actions.addStore({id: id});
        } //没有收藏过，点击收藏

        this.setState({
            isStore: !this.state.isStore
        })
    }

    /*
    * 检查商品是否已经被收藏
    * */
    checkStoreState () {
        const id = this.props.id;
        const store = this.props.store;

        store.some(item=>{
            if (item.id == id) {
                this.setState({
                    isStore: true //已经被收藏了
                })
            }
            return true;
        })
    }

    loginCheck() {
        const id = this.props.id;
        const userinfo = this.props.userinfo;
        if (!userinfo.username) {
            //没有登陆过，跳转到登陆页，/login/router:router是当前商品的详情页
            hashHistory.replace('/login/' + encodeURIComponent('details/' + id));
            return false;
        }

        return true;
    }

    render() {
        return (
            <BuyAndStore isStore={this.state.isStore}
                         buyHandler={this.buyHandler.bind(this)}
                         storeHandler={this.storeHandler.bind(this)}/>
        )
    }

}

let mapStateToProps = (state)=> {
    return {
        userinfo: state.userinfoReducer,
        store: state.storeReducer
    }
};

let mapDispatchToProps = (dispatch)=> {
    return {
        storeActions: bindActionCreators(storeActionFormList, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)
