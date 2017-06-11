import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import './style.less';
import Item from './item/item';

export default class OrderListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const data = this.props.data;
        const submitComment = this.props.submitComment;
        const dataList = data.map((item, index)=>{
            return  (<div key={index}>
                        <Item data={item} submitComment={submitComment}/>
                    </div>)
        });
        return (
            <div>
                {dataList}
            </div>
        )
    }

}