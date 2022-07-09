const { default: api } = require("../../util/api");
const message = require("../../util/message");

// pages/card/card.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        has_load:false,
        card_info:null,
        skin:''

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
          },
        }));

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

        this.getCardInfo();

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

        if(res.from=='button'){
            var obj = {};
            obj.title = this.data.card_info.share_title;
            obj.path = this.data.card_info.share_path;
            obj.imageUrl = this.data.card_info.share_image_url
            return obj;
        }

        return {
            
            title: '自定义转发标题',
            path: '/pages/article/detail?id=25'


        }

    },

    makePhoneCall:function(e){

        var mobile = e.currentTarget.dataset.mobile;
        wx.makePhoneCall({
          phoneNumber: mobile ,
        })
    },
    previewImage:function( e){
        var image_url = e.currentTarget.dataset.url;
        wx.previewImage({
          urls: [image_url],
        })
    },
    getCardInfo:function(  ){
        var me = this;
        var params = {};
        api.getCardInfo( {} , function( response ){
            if( response.status==1 ){

                me.setData({
                    has_load:true,
                    card_info:response.data
                })
                
            }else{
                message.show_error("管理员很懒，没留下任何信息" , function( ){
                    wx.navigateBack({
                      delta: 1,
                    })
                })

            }
        })
    },
    copyText:function (e) {
        var text = e.currentTarget.dataset.text;

        

        wx.setClipboardData({
          data:  text,
          success:function (res) {
              wx.getClipboardData({
                success: (option) => {
                    
                    wx.showToast({
                        title: '复制成功',
                      })

                },
              })
          }
        })
        
    },
    makePhoneCall:function (e) {
        var mobile = e.currentTarget.dataset.mobile;
        wx.makePhoneCall({
          phoneNumber: mobile,
        })
        
    }
})