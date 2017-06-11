import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import './style.less';

export default class LoginForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            phone: "",
            validate: true
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    checkPhoneValidate(str) {
        let reg = /^(13[0-9]|14[5|7]|15[0-9]|18[0-9])\d{8}$/;
        if (reg.test(str)) {
            //console.log("set true");
            this.setState({
                validate: true
            })
        }
        else {
            //console.log("set false");
            this.setState({
                validate: false
            })
        }
    }

    changeHandler(e) {
        let value = e.target.value;
        this.setState({
            phone: value
        })
    }

    clickHandler() {
        const clickProps = this.props.loginHandler;
        const phoneNum = this.state.phone;
        //this.checkPhoneValidate(phoneNum);
        if (this.state.validate) {
            clickProps(this.state.phone);
        }
        else {
            this.setState({
                phone: "请输入正确格式手机号~"
            })
        }

    }

    clearHandler() {
        this.setState({
            phone: ""
        })
    }

    render() {
        return (
            <div id="login-container">
                <div className="input-container phone-container">
                    <i className="icon-tablet"/>
                    <input type="text" placeholder="输入手机号" value={this.state.phone}
                           onChange={this.changeHandler.bind(this)} onFocus={this.clearHandler.bind(this)}/>
                </div>
                <div className="input-container password-container">
                    <i className="icon-key"/>
                    <button>发送验证码</button>
                    <input type="text" placeholder="输入验证码"/>
                </div>
                <button onClick={this.clickHandler.bind(this)} className="btn-login">登陆</button>
            </div>
        )
    }

}