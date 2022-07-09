const { default: api } = require("../../util/api");
const message = require("../../util/message");

// pages/article/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        search_word:'',
        article_list:[],
        no_data:false,
        page_index:1,
        no_more_data:false,
        no_data:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
    doSearchInput( e ){
        this.setData({
            search_word: e.detail.value
        })

    },
    doSearch(){
        var me = this;

        var page_index = 1;

        var params = {};
        params.search_word = this.data.search_word;
        params.page_index = 1;
        message.show_loading();
        api.doSearch( params , function( response ){
            message.hide_loading();
            if( response.status==1 ){

                var no_data = false;
                var no_more_data = false;


                if(response.data.length<=0){
                    no_data = true;
                }

                if( response.data.length<10 ){
                    no_more_data = true;

                }
                me.setData({
                    article_list: response.data,
                    no_data:no_data,
                    no_more_data:no_more_data,
                    page_index:1
                })
            }else{
                message.show_error( response.message )
            }

        })

    },
    getMore:function(){
        var me = this;

        var params = {};
        params.search_word = this.data.search_word;
        var page_index = this.data.page_index;

        page_index++;

        params.page_index = page_index;

        api.doSearch( params , function( response ){
            if( response.status==1 ){
                
                var article_list = me.data.article_list;

                var no_more_data = false;
                if(response.data.length<10){
                    no_more_data = true;
                }

                article_list = article_list.concat(response.data);

                me.setData({
                    page_index:page_index,
                    article_list:article_list,
                    no_more_data:no_more_data
                })

            }else{

                message.show_error( response )

            }
        })

    }
})