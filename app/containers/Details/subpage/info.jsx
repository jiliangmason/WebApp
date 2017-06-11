import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import {getInfoData} from '../../../fetch/details/details_fetch';
import DetailsInfo from '../../../components/details_info/details_info';

export default class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            info: false
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        const id = this.props.id;
        let res = getInfoData(id);
        res.then((response)=>response.json())
           .then((json)=> {
                //console.log(json)
               this.setState({
                   info: json
               })
            })
    }

    render() {
        const info = this.state.info
            ?<DetailsInfo data={this.state.info}/>
            :"无数据";
        return (
            <div>
                {info}
            </div>
        )
    }

}