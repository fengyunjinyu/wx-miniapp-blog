// pages/picture/index.js
import api from '../../util/api';
import message from '../../util/message';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page_index:1,
        picture_list:[],
        has_load:false,
        no_more_data:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        this.getPictureList();

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
    getPictureList:function () {
        var me = this;


        var params = {}
        params.page_index = this.data.page_index;
        api.getPictureList(params , function (response) {
            
            if(response.status==1){
                
                me.setData({
                    picture_list: response.data
                })
            }else{
                message.show_error( response.message )
            }
        })
        
    },
    getMore:function () {
        var me = this;
        var page_index = this.data.page_index;
        var params = {};
        page_index+=1;
        params.page_index = page_index;

        message.show_loading();
        api.getPictureList( params , function (response) {
            message.hide_loading();
            if( response.status==1 ){

                var data = response.data;

                var no_more_data = false;

                if(data.length<10){
                    no_more_data = true;

                }

                var picture_list = me.data.picture_list;

                picture_list = picture_list.concat(data);

                me.setData({
                    picture_list: picture_list,
                    no_more_data: no_more_data,
                    page_index: page_index
                })
            }   
        })


        
    }
})