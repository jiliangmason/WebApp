import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';
import './style.less';
import './style.css';

export default class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div id="home-header" className="clear-fix">
                <div className="float-left home-header-left">
                    <Link to="city">
                        <span>{this.props.cityName}</span>
                        &nbsp;
                        <i className="icon-angle-down"/>
                    </Link>
                </div>
                <div className="float-right home-header-right">
                    <i className="icon-user"/>
                </div>
                <div className="home-header-middle">
                    <div className="search-container">
                        <i className="icon-search"></i>
                        <input type="text" placeholder="请输入关键字"/>
                    </div>
                </div>
            </div>
        )
    }

}