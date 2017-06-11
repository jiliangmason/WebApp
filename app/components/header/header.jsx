import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import './style.less';
import {hashHistory} from 'react-router';

export default class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    handleClick() {
        /*
        * 加router的目的：个人中心登陆后返回首页
        * */
        const router = this.props.router;
        if (router) {
            hashHistory.replace(router); //回到首页
        }
        else {
            window.history.back(); //浏览器自带的返回
        }

    }

    render() {
        return (
            <div id="common-header">
                <span className="back-icon" onClick={this.handleClick.bind(this)}>
                    <i className="icon-chevron-left" />
                </span>
                <h1>{this.props.title}</h1>
            </div>
        )
    }

}