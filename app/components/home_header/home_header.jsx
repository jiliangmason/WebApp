import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import {Link, hashHistory} from 'react-router';
import SearchInput from '../../components/search_input/search_input';
import './style.less';
import './style.css';

export default class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    enterHandler(value) {
        //console.log(value);
        hashHistory.replace("search/all/" + encodeURIComponent(value));
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
                    <Link to="login">
                        <i className="icon-user"/>
                    </Link>
                </div>
                <div className="home-header-middle">
                    <div className="search-container">
                        <i className="icon-search"/>
                        <SearchInput value="" enterFn={this.enterHandler}/>
                    </div>
                </div>
            </div>
        )
    }

}