import http from './http.js';
var api = {}


api.getMiniappInfo = function (params  ,cb) {
    http.doGet("/guide/getMiniappInfo" ,params , function (response) {
        cb( response.data )
    })
}
api.getIndex = function( params , cb) {

    http.doGet("/guide/index" , params , function (response ) {
        cb( response.data )
    })
}
/**
 * 加载导购栏目
 */
api.getCategoryList = function(params ,  cb){
    http.doGet( "/guide/getCategoryList" , params , function( response ){
        cb( response.data )
    } )
}

api.getArticleList = function( params  , cb ){
    http.doGet("/guide/getArticleList" , params , function( response ){
        cb(response.data)
    })
}

api.doLogin = function(data , cb){
    http.doPost("/sign/login" ,  data , function(response){
      cb(response.data)
    })
}

api.getArticleDetail = function(  params , cb ){
    http.doGet("/guide/getArticleDetail" , params , function( response ){
        cb( response.data )
    })
}

api.getUserInfo = function( params , cb ){
    http.doGet("/guideUser/getUserInfo" , params , function( response ){
        cb(response.data);
    })
}

api.doSave = function( params , cb ){
    http.doGet("/guideUser/doSave" , params , function(response){
        cb(response.data);
    })
}

api.doZan = function( params , cb ){
    http.doGet("/guide/doZan" , params , function(response){
        cb( response.data )
    })
}

api.getCardInfo = function(params , cb){
    http.doGet("/guide/getCardInfo" , params , function( response ){
        cb(response.data)
    })
}

api.getUserSaveList = function( params , cb ){
    http.doGet("/guideUser/getUserSaveList" , params , function( response ){
        cb(response.data)
    })
}
// 
api.doSearch = function( data , cb ){
    http.doPost("/guide/doSearch", data , function( response ){
        cb( response.data )
    })
}
//加载推荐商品列表
api.getGoodList = function (params , cb) {
    http.doGet("/guideGood/getGoodList" , params , function (response) {
        cb(response.data )
    })
}
//加载推荐商品详情
api.getGoodDetail = function (params , cb) {
    http.doGet("/guideGood/getGoodDetail" , params , function (response) {
        cb( response.data );
    })
}

api.getGuideGroup = function (params , cb) {
    http.doGet("/guide/getGuideGroup" , params , function (response) {
        cb( response.data );
    })
}

api.getPictureList = function (params , cb) {
    http.doGet("/guidePicture/getPictureList" , params , function (response) {
        cb( response.data );
    })
}

api.getPictureDetail = function (params  , cb) {
    http.doGet("/guidePicture/getPictureDetail" , params, function (response) {
        cb( response.data )
    })
}

api.getNewsList = function (params ,cb) {
    http.doGet("/guideNews/getNewsList" , params , function (params) {
        cb( response.data );
    })
}

api.getMiniappTemplateInfo = function (params , cb) {
    http.doGet("/guide/getMiniappTemplateInfo" , params , function (response) {
        cb(response.data);
    })
}
api.getArticleIndexData = function( params , cb ){
    http.doGet("/guide/getArticleIndexData" , params , function( response ){
        cb(response.data)
    })
}
export default api;