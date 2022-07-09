const { default: api } = require("../../util/api");
const message = require("../../util/message");

// pages/me/save.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        has_load:false,
        user_save_list:[],
        no_data:false,
        page_index:1,
        no_more_data:false


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

        this.getUserSaveList();

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
    getUserSaveList:function(){
        var me  = this;
        var params = {};

        params.page_index = this.data.page_index;

        message.show_loading();
        api.getUserSaveList( params , function( response ){
            message.hide_loading();
            if(response.status==1){
                me.setData({
                    user_save_list:response.data
                })

            }else{
                message.show_error( response.message );
            }

        })
    },
    getMore:function(){
        var me = this;
        var params = {};
        var page_index = this.data.page_index+1;

        params.page_index = page_index;

        message.show_loading();
        api.getUserSaveList( params , function( response ){
            message.hide_loading();

            if(response.status==1){

                var no_more_data = false;
                if( response.data.length<10 ){
                    no_more_data = true;
                }

                var user_save_list = me.data.user_save_list;
                if(  response.data.length>0){
                    user_save_list = user_save_list.concat( response.data );
                }

                me.setData({
                    user_save_list:user_save_list,
                    no_more_data:no_more_data
                })


            }
        })
    }
})