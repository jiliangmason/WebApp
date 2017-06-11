import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import './style.less';

export default class BuyAndStore extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    storeHandler() {
        this.props.storeHandler();
    }

    buyClickHandler() {
        this.props.buyHandler();
    }

    render() {
        const storeState = this.props.isStore
            ? <button onClick={this.storeHandler.bind(this)}>已收藏</button>
            : <button onClick={this.storeHandler.bind(this)}>收藏</button>;

        return (
            <div className="buy-store-container clear-fix">
                <div className="item-container float-left">
                    {storeState}
                </div>
                <div className="item-container float-left">
                    <button onClick={this.buyClickHandler.bind(this)}>购买</button>
                </div>
            </div>
        )
    }

}