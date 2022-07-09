const { default: api } = require("../../util/api");
const message = require("../../util/message");

// pages/article/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        has_load:false,
        tab_index:-1,
        category_id:0,
        category_list:[],
        article_list:[],
        page_index:1,
        no_data:false

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        var me = this;
        if(wx.getExtConfig({
          success: (result) => {
              var skin = result.extConfig.skin

              me.setData({
                  skin: skin
              })
          }
        }));


        this.getArticleIndexData();



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
    onShareAppMessage() {

    },
    selectNav( e ){
        var index = e.currentTarget.dataset.index;
        var category_id = e.currentTarget.dataset.cid;

        this.setData({
            tab_index: index,
            category_id: category_id
        })


        this.getArticleList();

    },
    getCategoryList:function(){
        var me = this;

        message.show_loading();
        api.getCategoryList( {} , function( response ){
            message.hide_loading();


            if(response.status==1){
                console.log(11);


                me.setData({
                    category_list: response.data,
                    has_load:true,
                    article_list:[],
                    no_data:false,
                    no_more_data:false

                })
            }

        })
    },
    getArticleIndexData:function(  ){
        var me  = this;

        api.getArticleIndexData( {} , function( response ){
            if( response.status==1 ){

                me.setData({
                    category_list: response.data.category_list,
                    article_list:response.data.article_list,
                    has_load:true
                })

            }
        })

    },
    getArticleList:function(){
        var me = this;

        var params = {}
        params.category_id = this.data.category_id
        message.show_loading();
        api.getArticleList(  params  , function( response ){
            message.hide_loading();
            if( response.status==1 ){


                var no_data = false;
                if(response.data.article_list.length<10){
                    no_data = true;
                }

                var article_list = response.data.article_list;

                for(var i=0;i<article_list.length ; i++){
                    var images = [];
                    try{

                        images = JSON.parse( article_list[i].image_list );
                    }catch(err){

                    }
                    article_list[i].image_list = images
                }

                console.log(article_list);
                me.setData({
                    article_list: article_list,
                    page_index:response.data.page_index,
                    no_data: no_data

                })

            }else{
                message.show_error( response.message )
            }

        })
    },
    getMore:function(){

        var me = this;

        var params = {}
        params.category_id = this.data.category_id

        var page_index = this.data.page_index;
        page_index++;

        params.page_index = page_index;

        message.show_loading();
        api.getArticleList(  params  , function( response ){
            message.hide_loading();
            if( response.status==1 ){

                var no_data= false;
                if( response.data.article_list.length<10 ){
                    no_data = true;
                }

                var article_list = me.data.article_list;

               article_list =  article_list.concat(response.data.article_list);

                me.setData({
                    article_list: article_list,
                    page_index: response.data.page_index,
                    no_data:no_data
                })

            }else{
                message.show_error( response.message )
            }

        })

        

    }
})