import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import './style.less';

export default class Star extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const star = this.props.star > 5
            ? this.props.star % 5
            : this.props.star;

        let allStars = [1, 2, 3, 4, 5].map((item, index)=> {
            if (item <= star) {
                let starName = ' light';
                return <i className={"icon-star" + starName} key={index}/>
            }
            return <i className="icon-star" key={index}/>
        });

       // console.log(allStars);
        return (
            <div className="star-container">
                {allStars}
            </div>
        )
    }

}