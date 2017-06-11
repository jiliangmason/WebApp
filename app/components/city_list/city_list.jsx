import React from 'react';
import {PureRenderMixin} from 'react-addons-pure-render-mixin';
import './style.less';

export default class CityList extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    clickHandler(newCity) {
        const changeCity = this.props.changeCity;
        changeCity(newCity);
    }

    render() {
        return (
            <div className="city-list-container">
                <h3>热门城市</h3>
                <ul>
                    <li>
                        <span onClick={this.clickHandler.bind(this,"北京")}>北京</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,"上海")}>上海</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,"杭州")}>杭州</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,"广州")}>广州</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,"成都")}>成都</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,"深圳")}>深圳</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,"南京")}>南京</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,"重庆")}>重庆</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,"苏州")}>苏州</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,"西安")}>西安</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,"福建")}>福建</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandler.bind(this,"武汉")}>武汉</span>
                    </li>
                </ul>
            </div>
        )
    }

}