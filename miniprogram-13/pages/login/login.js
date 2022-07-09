// pages/login/login.js
const { default: api } = require("../../util/api");
const message = require("../../util/message");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        miniapp:null,
        has_load:false

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        this.getMiniappInfo();

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

    doLogin:function(){

        wx.getUserProfile({
          desc: '展示用户信息',
          success:function(  res ){
              
            if(res.userInfo){
                var userInfo = res.userInfo
            }

            wx.login({
                success:function( res2 ){
                    if( res2.code ){
                        userInfo.code = res2.code

                        message.show_loading("登陆中")
                        api.doLogin( userInfo , function( response ){
                            message.hide_loading();
                            if(response.status==1){


                                console.log("登录token");
                                console.log(response.data.token);

                                wx.setStorage({
                                    "key":'user_info',
                                    "data": JSON.stringify(response.data.user_info),
                                    success:function(){
                                        console.log("用户信息保存成功")
                                    }
                                });
                                wx.setStorage({
                                    key:'token',
                                    "data": response.data.token,
                                    success:function(){
                                        console.log("token缓存成功");
                                        
                                        message.success(response.message , function(){ 
                                            /*
                                            wx.switchTab({
                                              url: '/pages/me/me',
                                            })

                                            */

                                            wx.navigateBack({
                                                delta:1
                                            })
        
                                        })

                                    }
                                })
                            }else{
                                message.show_error( response.message )
                            }
                        })
                    }

                }
            })

          }
        })

    },
    getMiniappInfo:function () {
        var me = this;
        message.show_loading();
        api.getMiniappInfo( {} , function (response) {
            message.hide_loading();
            if( response.status==1){

                me.setData({
                    miniapp: response.data,
                    has_load:true
                })
                
            }else{
                message.show_error( response.message )
            }
        })
    }
})