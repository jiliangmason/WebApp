import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import HomeHeader from '../../components/home_header/home_header';
import {connect} from 'react-redux';
import Carousel from '../../components/catorgory/causel';
import AdFavour from './subpage/ad';
import HomeList from './subpage/list';

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <HomeHeader cityName={this.props.userinfo.cityName}/>
                <Carousel />
                <div style={{height: "15px"}}></div>
                <AdFavour />
                <HomeList cityName={this.props.userinfo.cityName}/>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfoReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)