const { default: api } = require("../../util/api");
const message = require("../../util/message");

// pages/guide/group.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        guide_group:null,
        has_load:false

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        this.getGuideGroup();

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

    onShareTimeline(){

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage( res ) {
        if( res.from=='button'){

            var guide_group = this.data.guide_group;
            var obj = {}
            obj.title = guide_group.share_title || '快来加入我的微信群';
            obj.imageUrl = guide_group.share_image_url || guide_group.qrcode;
            obj.path = guide_group.path || '/pages/guide/group'

            return obj;

        }
    },
    getGuideGroup:function (  ) {
        var me = this;

        api.getGuideGroup( {} , function (response) {

            if( response.status==1 ){
                me.setData({
                    guide_group: response.data,
                    has_load: true
                })
            }else{
                message.show_error( response.message )
            }
        })
        
    },
    previewImage( e ){
      var url = e.currentTarget.dataset.url;

      wx.previewImage({
        urls: [url],
      })
    }
})