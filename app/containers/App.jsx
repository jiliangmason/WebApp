import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin'
import {LocalStore} from '../util/localStore';
import {CITYNAME} from '../config/localStoreConfig';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userInfoActionFormList from '../actions/userinfo_action';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            initDone: false
        };
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        let cityName = LocalStore.getItem(CITYNAME);
        if (cityName == null) {
            cityName = "北京";
        }

        /*
            作用: 发出更新城市的动作
        * 将城市信息存储到redux中：this.props.userInfoActions被mapDispatchToProps映射上来的
        * */
        this.props.userInfoActions.updateCityName({
            cityName: cityName
        });

        this.setState({
            initDone: true
        });

    }

    render() {
        return (
            <div>
                {
                    this.state.initDone ?
                        this.props.children :
                        <div>
                            正在加载...
                        </div>
                }
            </div>
        )
    }

}

let mapStateToProps = (state)=>{
    return {}
};

let mapDispatchToProps = (dispatch)=>{
    return {
        userInfoActions: bindActionCreators(userInfoActionFormList, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
