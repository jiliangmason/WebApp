import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Header from '../../components/header/header';
import CurrentCity from '../../components/current_city/current';
import {bindActionCreators} from 'redux';
import * as ActionTypeList from '../../actions/userinfo_action';

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <Header title="选择城市"/>
                <CurrentCity userCity={this.props.userCity}/>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        userCity: state.userinfoReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userChangeCity: bindActionCreators(ActionTypeList, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(City)

