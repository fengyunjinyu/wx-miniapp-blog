const { default: api } = require("../../util/api");

// pages/me/setting.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

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

        this.getUserInfo();

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
    doLogout:function(){

        wx.clearStorage({
          success: (res) => {
              wx.reLaunch({
                url: '/pages/me/me',
              })
          },
        })

    },
    getUserInfo:function(){
      var me = this;
      api.getUserInfo({} , function(response){
        if(response.status ==1){
          me.setData({
            user_info:response.data
          })
        }else{
          console.log(response.error)
        }
      })
    },
})