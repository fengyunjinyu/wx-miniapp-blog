const { default: api } = require("../../util/api");
const message = require("../../util/message")

// pages/good/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        has_load:false,
        id:0,
        good:null,
        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        if(options.id){

            this.setData({
                id:options.id
            })
            this.getGoodDetail(options.id);

        }else{
            message.show_error("商品ID异常")
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
    onShareAppMessage( res ) {

        if( res.from == 'button' ){

            var obj = {};

            obj.title = this.data.good.share_title;
            obj.imageUrl = this.data.good.share_image_url;
            obj.path = "/pages/good/detail?id=10"

            return  obj
        }

        if( res.from=='menu' ){

        }

    },
    onShareTimeline(){

        var obj = {};
        var good = this.data.good;
        obj.title = good.share_title;
        obj.query = "id="+good.id;
        obj.imageUrl = good.share_image_url;


        return obj;

    },
    getGoodDetail:function (id) {

        var me = this;
        var params = {};
        params.id = id;
        api.getGoodDetail( params , function (response) {
            if( response.status==1 ){

                var good = response.data;
                wx.setNavigationBarTitle({
                  title: good.name,
                })
                me.setData({
                    good: response.data,
                    has_load: true
                })

            }else{
                message.show_error( response.message )
            }
        } ,"json")
        
    },
    previewImage:function (e) {
        var url = e.currentTarget.dataset.url;
        wx.previewImage({
          urls: [url],
        })
    },
    makePhone:function (e) {
        var mobile = e.currentTarget.dataset.mobile;
        wx.makePhoneCall({
          phoneNumber: mobile,
        })
        
    },
    openMiniapp:function () {

        var good = this.data.good;
        if(!good){
            return ;
        }

        if(good['open_type']!='miniapp'){
            message.show_error("当前设置不支持打开其他小程序");
        }


        var obj = {};

        obj.appId = good.link_appid;
        obj.path = good.link_path;
        obj.envVersion='develop'

        wx.navigateToMiniProgram(obj);
        
    }
})