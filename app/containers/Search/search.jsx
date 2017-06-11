import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import SearchHeader from '../../components/search_header/search_header';
import SearchList from './subpage/search_list';

export default class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const params = this.props.params; //跳转到search页面params：id catergory keyword
        return (
            <div>
                <SearchHeader keyword={params.keyword}/>
                <SearchList keyword={params.keyword} category={params.category}/>
            </div>
        )
    }

}

