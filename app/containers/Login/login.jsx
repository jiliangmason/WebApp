import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import * as ActionTypeList from '../../actions/userinfo_action';
import LoginForm from '../../components/login_form/login_form';
import Header from '../../components/header/header';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checking: true  //正在检查是否已经登陆过
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        this.doCheck();
    }

    doCheck() {
        const username = this.props.userinfo.username;
        if (username) {
            //console.log(username);
            this.goUserPage();
        } //already logined
        else {
            this.setState({
                checking: false //display login component
            })
        } //didn't login
    }

    loginHandler(username) {
        const actions = this.props.userIdActions;
        let userinfo = this.props.userinfo;
        /*
        * 修改redux，redux里面存的数据username cityName --> state.userinfoReducer下面
        * 条件：该组件是容器组件，且经过mapStateToProps和mapDispatchToProps
        * */
        userinfo.username = username;
        actions.login(userinfo); //发出动作，相当于把修改后的userinfoReducer发出

        /*
        * 跳转页面
        * */
        const params = this.props.params;
        let router = params.router;
        if (router) {
            //console.log(123,router);
            hashHistory.replace(router); //router是encodeURIComponent('details/' + id)，见buy.jsx
        }
        else {
            //console.log("跳转默认页");
            this.goUserPage(); //router无，跳转到默认页面
        }
    }

    goUserPage() {
        hashHistory.push("/user");
    }

    render() {
        const login = this.state.checking
        ? <div></div>
        : <LoginForm loginHandler={this.loginHandler.bind(this)}/>;
        return (
            <div>
                <Header title = "用户登陆"/>
                {login}
            </div>
        )
    }

}

const mapStateToProps = (state)=>{
    return {
        userinfo: state.userinfoReducer
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        userIdActions: bindActionCreators(ActionTypeList, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)