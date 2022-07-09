const { default: api } = require("../../util/api");
const message = require("../../util/message");

var WxParse = require("../../vendor/wxParse/wxParse");

// pages/article/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        has_load: false,
        article: null,
        relation: null

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        if(options.id){
            this.setData({
                article_id:options.id
            })


            this.getArticleDetail( );
        }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage( res ) {
        //分享给好友

        if(res.from=='button'){

            console.log(res.target)

            var obj = {}
            obj.title=this.data.article.share_title,
            obj.path = this.data.article.url;
            obj.imageUrl = this.data.article.share_image_url

            return obj;
        }

        return {
            
            title: '自定义转发标题',
            path: '/pages/article/detail?id=25'
        }

    },
    onShareTimeline:function( res ){
        if( res.from=='button' ){

            console.log(res.target)

            var obj = {}
            obj.title=this.data.article.share_title,
            obj.path = this.data.article.url;
            obj.imageUrl = this.data.article.share_image_url

            return obj;

        }
        var obj = {};
        obj.title=this.data.article.share_title,
        obj.path = this.data.article.url;

        return obj;
    },
    getArticleDetail:function(){
        var me = this;

        var params = {};
        params.id = this.data.article_id;

        message.show_loading();
        api.getArticleDetail( params ,function( response ){
            message.hide_loading();        
            if( response.status==1 ){
                var detail = response.data.article;
                try{

                    detail.image_list = JSON.parse(detail.image_list)
                }catch( err  ){
                    detail.image_list = [];
                }


                var content = detail.content;
                var type = detail.content_type;


                WxParse.wxParse("article_content" , "html" , content , me , 10)


                wx.setNavigationBarTitle({
                  title:  detail.title ,
                })
                me.setData({
                    has_load:true,
                    article: detail,
                    relation:response.data.relation
                })
            }else{
                message.show_error( response.message  , function(){
                    wx.navigateBack({
                      delta: 1,
                    })
                })
            }
            

        })  
    },
    previewImage:function( e ){
        var url = e.currentTarget.dataset.url;

        var urls = url.toString().split(",");


        wx.previewImage({
          urls: urls,
          current:url
        })

    },
    previewImageList:function(e){
        var images = this.data.article.image_list;
        var url = e.currentTarget.dataset.url;

        wx.previewImage({
          urls: images,
          current:url
        })
    },
    doZan:function(){
        var me = this;
        var params = {};
        params.article_id = this.data.article.id;
        api.doZan( params , function( response ){
            if(response.status==1){

                var article = me.data.article;

                article.nums_zan = response.data;
                me.setData({
                    article: article
                })

            }else{

                message.show_error( response.message );

            }
        })
    },
    doSave:function(){

        var params = {};
        params.article_id = this.data.article.id;
        message.show_loading("收藏中");
        api.doSave( params , function(response ){
            message.hide_loading();
            if(response.status==1){
                message.toast( response.message );
            }else{
                message.show_error( response.message );
            }
        } )

    }
})