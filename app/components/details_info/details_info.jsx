import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import './style.less';
import Star from '../../components/star/star';

export default class DetailsInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    markup(data) {
        return {
            __html: data.desc
        }
    }

    render() {
        const data = this.props.data;
        //console.log(data);
        return (
            <div id="detail-info-container">
                <div className="info-container clear-fix">
                    <div className="info-img-container float-left">
                        <img src={data.img} />
                    </div>
                    <div className="info-content">
                        <Star star={data.star}/>
                        <span className="price">￥{data.price}</span>
                    </div>
                    <p className="sub-title">{data.subTitle}</p>
                </div>
                <p dangerouslySetInnerHTML={this.markup(data)} className="info-desc"/>
            </div>
        )
    }

}