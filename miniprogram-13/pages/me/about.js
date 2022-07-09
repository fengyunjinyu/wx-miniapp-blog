const { default: api } = require("../../util/api");
const message = require("../../util/message");

// pages/me/about.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        template_info:null,
        has_load:false

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        this.getMiniappTemplateInfo();

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
    getMiniappTemplateInfo(){
        var me = this;
        message.show_loading();
        api.getMiniappTemplateInfo( {} , function (response) {
            message.hide_loading();
            console.log( response );
            if( response.status==1 ){
                console.log(response);

                me.setData({
                    has_load: true,
                    template_info: response.data
                })

            }else{

                message.show_error( response.message )

            }
        } )
    },
    makePhone:function (e) {
        var mobile = e.currentTarget.dataset.mobile;
        wx.makePhoneCall({
          phoneNumber: mobile,
        })
    }
})