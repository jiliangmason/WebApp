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

    }
```

2. 首页广告 & 列表数据获取：
```
ComponentDidMount() {
  fetch('/api/ad', options)
   .then(res=>res.json())
   .then(json=>data)
}
```

data渲染页面 <br/>

3. 下拉刷新：
state的结构：
```
this.state = {
            data: [],
            hasMore: false, //true: 有数据加载  false: 无数据  由服务端发送
            isLoadingMore: false, //判断加载状态是 true:正在加载....（还没加载完） 还是 false:加载更多（已经完成）
            page: 1 //下一页的页码
        }


下拉加载的处理函数：

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
    }

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
}
```
<br />

### 城市页面
1. 通过点击选择城市，然后修改redux的cityName：
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
        hashHistory.push("/");
```
<br />

### 搜索页面：
1. 进入Search的2个位置：
* 轮播图
* 首页顶部搜索
search的router规则是：/search/:category(/:keyword)
search的3个组件是：
* SearchInput: 输入keyword
* SearchHeader：显示keyword，包含SearchInput
* SearchList: 根据keyword和category来获取搜索结果列表

search后台的请求Api：
```
export function getSearchList(city, page, category, keyword) {
    let keywordStr = keyword ? "/" + keyword : "";
    const result = getData('/api/search' + '/' + page + '/' + city + '/' + category + keywordStr);
    return result;
}
```
SearchList组件中添加：
```
componentDidUpdate(prevProps, prevState) {
        /*
        1.只要props和state发生改变就进入这个函数,
        2.在当前页继续搜索时，可以调用该函数
        */
        const props = this.props;
        if(props.keywords == prevProps.keywords && props.category == prevProps.category) {
            return;
        }
        this.setState({
            data: [],
            hasMore: false,
            isLoadingMore: false,
            page: 1
        });

        this.loadFirstPage();
    }
```
其余实现同首页的List

### 详情页面：
1. 把id传递给Info和Comment组件
2. Comment组件使用LoadMore组件加载更多，首页+搜索列表+Comment都采用了加载更多，加载更多都需要传递一个page
3. <Header title="商品详情"/>，Header组件还有一个缺省属性是router, 如果存在router，则跳转到router页

### 登陆页面：
1. 路由：<Route path="/login(/:router)" component={Login}/>
说明在哪里登陆的，登陆后跳到哪里

2. componentDidMount后从redux中取username，若存在则跳转到user个人详情
若不存在则使用LoginForm组件登陆

3. 登陆方法：
```
loginHandler(username) {
        const actions = this.props.userIdActions;
        let userinfo = this.props.userinfo;
        /*
        * 修改redux，redux里面存的数据username cityName --> state.userinfoReducer下面
        * 条件：该组件是容器组件，且经过mapStateToProps和mapDispatchToProps
        * */
        userinfo.username = username;
        actions.login(userinfo); //发出动作，更新redux的userinfo

        /*
        * 跳转页面，从详情页的购买来，登陆完成后就回去
        * */
        const params = this.props.params;
        let router = params.router;
        if (router) {
            hashHistory.replace(router); //router是encodeURIComponent('details/' + id)，见buy.jsx
        }
        else {
            //console.log("跳转默认页");
            this.goUserPage(); //router无，跳转到默认页面
        }
    }
```

### 购买&收藏页面：
1. 商品详情页传入商品id
2. storeHandler用来检查是否已经收藏，从redux的store中查找id
3. buyHandler用来购买相应商品，省略购买流程，购买完后跳转至个人中心
4. loginCheck检查用户是否登陆，若未登陆
```
hashHistory.replace('/login/' + encodeURIComponent('details/' + id));
```
跳转至登陆页面，登陆页面登陆后，可以根据后面的内容跳回来

### 用户中心页面：
1. 用户中心会在组件加载后判断是否登陆，未登陆先登陆
2. 头部组件<Header title="用户中心" router="/"/> 必须要有一个router="/"
   否则点击返回上一页，回到登陆页面，登陆页面判断用户已经登陆，又会跳回个人中心，效果上就是闪一下，
   代码：
   ```
   doCheck() {
           const username = this.props.userinfo.username;
           if (username) {
               //console.log(username);
               this.goUserPage();
           } //already logined
           else {
               this.setState({
                   checking: false //display login component
               })
           } //didn't login
       }
   ```
   Login组件的docheck中，当username存在时，会跳回个人页面
3. OrderList组件通过getOrderListData，获取后台的数据
   将数据和提交方法submitComment传给子组件OrderListItem，其中的submitComment是：
   ```
   submitComment(id, value, callback) {
           const result = postComment(id, value);
           result.then(res=>res.json())
                 .then(json=>{
                     if (json.errno === 0)  //已经评论成功
                     callback();
                 }).catch(err=>{
                     console.log(err.message);
                   })
       }
   ```  
   由此可以看到子组件可以传一个callback函数给父组件调用，
4. 用户评论的对话框三个状态：
```
this.state = {
            commentState: 2  //0:未评价 1:正在评价 2:评价结束
        };
```



### 订单评价页面开发
1. DetailsComment组件，传入商品详情id
2. 传统套路：
loadFirstPage(获取数据) -> 下拉加载loadMore(加载更多) -> 把数据交给木偶组件DetailsCommentList展示