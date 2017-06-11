import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import Header from '../../components/header/header';
import UserInfo from '../../components/user_info/user_info';
import OrderList from './subpage/order';

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        if (!this.props.userinfo.username) {
            hashHistory.push("/login");
        } //没有用户, 跳转到登陆页面
    }

    render() {
        const userinfo = this.props.userinfo;
        return (
            <div>
                <Header title="用户中心" router="/"/>
                <UserInfo username={userinfo.username} cityName={userinfo.cityName}/>
                <OrderList username={userinfo.username}/>
            </div>
        )
    }

}

let mapStateToProps = (state)=> {
    return {
        userinfo: state.userinfoReducer,
    }
};

let mapDispatchToProps = (dispatch)=> {
    return {

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)
