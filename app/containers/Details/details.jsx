import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import Header from '../../components/header/header';
import Info from './subpage/info';
import DetailsComment from './subpage/comment';
import Buy from './subpage/buy';

export default class Details extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const id = this.props.params.id;
        return (
            <div>
                <Header title="商品详情"/>
                <Info id={id}/>
                <Buy id={id} />
                <DetailsComment id={id}/>
            </div>
        )
    }

}