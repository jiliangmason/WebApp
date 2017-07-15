# 基于React React-Redux 团购网页app

## 运行方式
1. npm install
2. npm run mock 起服务
2. npm run start 自动打开本地8080端口
3. npm run webpack 打包到dist文件夹

## 项目技术概括：
### 首页：
1. App.jsx -> 从localStorage中取城市数据，没有就默认为北京，更新到redux <br>
```
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

    } ``` 
<br>
2. 首页广告 & 列表数据获取：
```
ComponentDidMount() {
  fetch('/api/ad', options)
   .then(res=>res.json())
   .then(json=>data)
}
```

data渲染页面 <br>

3. 下拉刷新：
state的结构：
```
this.state = {
            data: [],
            hasMore: false, //true: 有数据加载  false: 无数据  由服务端发送
            isLoadingMore: false, //判断加载状态是 true:正在加载....（还没加载完） 还是 false:加载更多（已经完成）
            page: 1 //下一页的页码
        }```


下拉加载的处理函数：
```
LoadMoreData() {
        this.setState({
            isLoadingMore:true //正在加载中...
        });
        const cityName=this.props.cityName; //当前城市
        const page = this.state.page; //当前页码
        const res=getHomeList(cityName,page);

        this.handleData(res); //fetch

        this.setState({
            isLoadingMore:false, //加载完成
            page: page+1
        })
    }``` 


```
componentDidMount() {
  判断加载按钮距离顶部的距离，若小于整个屏幕高就加载：
  function callback() {
  let loadingHeight = loadBtn.getBoundingClientRect().top; //加载按钮距离屏幕的高          
  let windowHeight = document.documentElement.clientHeight; //屏幕高度
  if (loadingHeight && loadingHeight < windowHeight) {
                loadMoreFn();
     }
  } 
  
一个技巧：该操作可以在鼠标滚动时，减少触发callback的次数
window.addEventListener('scroll', function() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(callback, 50)  
})
}```


### 城市页面
1. 通过点击选择城市，然后修改redux的cityName： <br>
```
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
        hashHistory.push("/");```





