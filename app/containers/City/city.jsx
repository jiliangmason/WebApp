import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Header from '../../components/header/header';
import CurrentCity from '../../components/current_city/current';
import CityList from '../../components/city_list/city_list';
import {LocalStore} from '../../util/localStore';
import {CITYNAME} from '../../config/localStoreConfig';
import {hashHistory} from 'react-router';

import {bindActionCreators} from 'redux';
import * as ActionTypeList from '../../actions/userinfo_action';

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    changeCity(newCity) {
        if (newCity == null)
            return;
        /*
        * 修改redux
        * */
        const usercity = this.props.userCity;
        usercity.cityName = newCity; //产生新数据
        this.props.userChangeCity.updateCityName(usercity); //通过发出action来修改redux

        /*
        * 修改localStorage
        * */
        LocalStore.setItem(CITYNAME, newCity);

        /*
        * 跳转回home页面
        * */
        hashHistory.push("/");
        //hashHistory.replace("/");
    }

    render() {
        return (
            <div>
                <Header title="选择城市"/>
                <CurrentCity userCity={this.props.userCity}/>
                <CityList changeCity={this.changeCity.bind(this)}/>
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

