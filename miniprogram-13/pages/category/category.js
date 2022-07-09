const { default: api } = require("../../util/api");
const message = require("../../util/message")

// pages/category/category.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        category_id:-1,
        has_load:false,
        article_list:[],
        no_data:false,
        no_more_data:false,
        page_index:1

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        if(options.id){
            this.setData({
                category_id:options.id
            })
            this.getArticleList();
        }else{
            message.show_error("栏目编号不存在");
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
    onShareAppMessage() {

    },
    getArticleList:function () {
        var me = this;
        var params = {};
        params.category_id = this.data.category_id;

        message.show_loading();
        api.getArticleList( params , function (response) {
            message.hide_loading();

            if(response.status==1){

                wx.setNavigationBarTitle({
                  title:  response.data.category.category_name,
                })


                var article_list = response.data.article_list;

                var no_data = false;
                if(article_list.length<=0){
                    no_data = true;
                }


                var no_more_data = false;
                if(article_list.length <10){
                    no_more_data = true;
                }

                me.setData({
                    article_list: response.data.article_list,
                    has_load:true,
                    page_index:response.data.page_index,
                    no_data: no_data,
                    no_more_data: no_more_data
                })
            }else{
                message.show_error( response.message )
            }            
        })
    },
    getMore:function () {
        console.log("getMore");
        var me = this;



        if(this.data.no_data){
            return ;
        }

        if(this.data.no_more_data){
            return ;
        }
        var page_index = this.data.page_index;

        page_index++;
        var params = {};
        params.page_index = page_index;
        params.category_id = this.data.category_id;

        message.show_loading();
        api.getArticleList( params , function (response) {
            message.hide_loading();
            if(response.status==1){


                var a_list = response.data.article_list;

                var no_more_data = false;
                if(a_list.length<10){
                    no_more_data = true;
                }

                var no_data = false;
                
                var article_list = me.data.article_list;


                article_list = article_list.concat( a_list);

                if(article_list.length<=0){
                    no_data = true;
                }


                me.setData({
                    article_list:article_list,
                    no_data:no_data,
                    no_more_data: no_more_data,
                    page_index: response.data.page_index
                })
            }else{

                message.show_error(response.message)

            }
        })


    }
})