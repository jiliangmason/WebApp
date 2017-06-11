import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import Star from '../star/star';

export default class DetailsCommentList extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let data = this.props.data;
        let dataList = data.length
            ? data.map((item, index)=> {
            return (
                <div key={index} className="comment-list">
                    <div className="comment-item">
                        <h3>
                            <i className="icon-user"/>
                            &nbsp;
                            {item.username}
                        </h3>
                        <Star star={item.star}/>
                        <p>{item.comment}</p>
                    </div>
                </div>
            )
        })
            : "未加载到评论";
        return (
            <div>
                {dataList}
            </div>
        )
    }

}