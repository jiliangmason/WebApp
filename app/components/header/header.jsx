import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import './style.less';

export default class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    handleClick() {
        window.history.back(); //浏览器自带的返回
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