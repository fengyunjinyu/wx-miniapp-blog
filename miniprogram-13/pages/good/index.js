const { default: api } = require("../../util/api")
const message = require("../../util/message")

// pages/good/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        has_load: false,
        comment:{
            score:5
        },
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

        this.getGoodList();

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
    getGoodList:function () {
        var me = this;
        message.show_loading();
        api.getGoodList( {} , function (response) {
            message.hide_loading();
            if( response.status==1 ){


                var good_list = response.data;

                var no_data = false;
                if(good_list.length<=0){
                    no_data = true;
                }

                var no_more_data = false;
                if( good_list.length<10){
                    no_more_data = true;
                }

                me.setData({
                    good_list: response.data,
                    has_load:true,
                    no_more_data:no_data,
                    no_data:no_data
                })

            }else{
                
            }
        })
    },
    getMore:function (  ) {
        var me = this;
        if(this.data.no_data || this.data.no_more_data){
            return;
        }

        var page_index = this.data.page_index;
        page_index++;

        var params = {};
        params.page_index = page_index;

        message.show_loading();
        api.getGoodList( params , function (response) {
            message.hide_loading();
            if( response.status==1 ){


                var good_list = response.data;

                var no_data = false;
                if(good_list.length<=0){
                    no_data = true;
                }

                var no_more_data = false;
                if( good_list.length<10){
                    no_more_data = true;
                }

                var t_list = me.data.good_list;

                t_list = t_list.concat(good_list);

                me.setData({
                    good_list: t_list,
                    has_load:true,
                    no_more_data:no_more_data,
                    no_data:no_data,
                    page_index:page_index
                })  

            }else{
                message.show_error( response.message )
            }
            
        } )


    },

})