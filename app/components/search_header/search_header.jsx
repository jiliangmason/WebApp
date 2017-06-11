import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import SearchInput from '../search_input/search_input';
import {hashHistory} from 'react-router';
import './style.less';

export default class SearchHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    clickHandler() {
        //window.history.back();
        hashHistory.replace("/");
    }

    enterHandler(value) {
        hashHistory.replace("search/all/" + encodeURIComponent(value));
    }


    render() {
        return (
            <div id="search-header" className="clear-fix">
                <span onClick={this.clickHandler.bind(this)} className="back-icon float-left">
                    <i className="icon-chevron-left"/>
                </span>
                <div className="input-container">
                    <i className="icon-search"/>
                    &nbsp;
                    <SearchInput value={this.props.keyword || ""} enterFn={this.enterHandler}/>
                </div>
            </div>
        )
    }

}