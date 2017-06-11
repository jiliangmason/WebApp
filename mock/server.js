var app = require('koa')();
var router = require('koa-router')();

// router.get('/', function *(next) {
//     this.body = 'hello koa !'
// });

// router.get('/api', function *(next) {
//     this.body = 'test data'
// });

// 首页 —— 广告（超值特惠）
var homeAdData = require('./home/ad.js');
router.get('/api/homead', function *(next) {
    this.body = homeAdData
});

// 首页 —— 推荐列表（猜你喜欢）
var homeListData = require('./home/list.js');
router.get('/api/homelist/:city/:page', function *(next) {
    // 参数
    const params = this.params;
    const paramsCity = params.city;
    const paramsPage = params.page;

    console.log('当前城市：' + paramsCity);
    console.log('当前页数：' + paramsPage);

    this.body = homeListData
});

/*
 * 搜索结果需要传入3个参数 city-category-keyword
 * */
var searchListData = require('./search/list');
router.get('/api/search/:page/:city/:category/:keyword', function *(next) {
    const params = this.params;
    const paramsPage = params.page;
    const paramsCity = params.city;
    const paramsCategory = params.category;
    const paramsKeyword = params.keyword;

    console.log('当前页数：' + paramsPage);
    console.log('当前城市：' + paramsCity);
    console.log('当前类别：' + paramsCategory);
    console.log('关键字：' + paramsKeyword);

    this.body = searchListData;
});

/*
 * 搜索结果：两个参数 city-category
 *
 * */
router.get('/api/search/:page/:city/:category', function *(next) {
    const params = this.params;
    const paramsPage = params.page;
    const paramsCity = params.city;
    const paramsCategory = params.category;

    console.log('当前页数：' + paramsPage);
    console.log('当前城市：' + paramsCity);
    console.log('当前类别：' + paramsCategory);

    this.body = searchListData;
});

/*
* 商户信息
* */
var detailsInfo = require('./details/info');
router.get('/api/details/info/:id', function *(next) {
    const params = this.params;
    const paramsId = params.id;

    console.log("当前商户id:" + paramsId);
    this.body = detailsInfo;
});

/*
* 商户评论
* */
var detailsComments = require('./details/comments');
router.get('/api/details/comments/:page/:id', function *(next) {
    const params = this.params;
    const paramsId = params.id;
    const paramsPage = params.page;

    console.log("当前商户id:" + paramsId);
    console.log('当前页数：' + paramsPage);
    this.body = detailsComments;
});

/*
 * 用户购买
 * */
let orderList = require('./user/user');
router.get('/api/orderlist/:username', function *(next) {
    const params = this.params;
    const paramsUser = params.username;

    console.log("当前用户名:" + paramsUser);
    this.body = orderList;
});

/*
* 评论提交
*
* */
router.post('/api/submitComment', function *(next) {
    console.log('提交评论');
    this.body = {
        errno: 0,
        msg: 'server recevied ok'
    }
});

// 开始服务并生成路由
app.use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);

