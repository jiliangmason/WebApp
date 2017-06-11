import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import './style.less';

export default class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            keyword: ""
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        this.setState({
            keyword: this.props.value || ""
        })
    }

    /*
     * 约束：监控input的变化，将值实时保存到state中，
     * 然后从state中取值填入input的value
     * */
    changeHandler(e) {
        let value = e.target.value;
        this.setState({
            keyword: value
        });
    }

    keyUpHandler(e) {
        if (e.keyCode !== 13) {
            return;
        }

        this.props.enterFn(this.state.keyword);
    }

    render() {
        return (
            <input className="search-input" type="text" value={this.state.keyword}
                   onChange={this.changeHandler.bind(this)} onKeyUp={this.keyUpHandler.bind(this)}/>
        )
    }

}