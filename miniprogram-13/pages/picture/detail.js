const { default: api } = require("../../util/api");
const message = require("../../util/message");

// pages/picture/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        id:0,
        picture:null,
        has_load:false,
        current:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        if(options.id){

            this.setData({
                id: options.id
            })


            this.getPictureDetail( options.id )

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

        if( res.from=='button' ){
          var obj = {};
          var picture = this.data.picture;
      
          if(picture.share_title && picture.share_title!=''){
            obj.title = picture.share_title;
  
          }else{
            obj.title = picture.title
          }
          if(picture.share_image_url && picture.share_image_url!=''){
            obj.imageUrl = picture.share_image_url; 
  
          }else{
            obj.imageUrl = picture.thumb;
          }
          obj.path = picture.path;
          return obj;

        }else{
            
        }

    },

    onShareTimeline(){
        var obj = {};
        var picture = this.data.picture;
    
        if(picture.share_title && picture.share_title!=''){
          obj.title = picture.share_title;

        }else{
          obj.title = picture.title
        }
        if(picture.share_image_url && picture.share_image_url!=''){
          obj.imageUrl = picture.share_image_url; 

        }else{
          obj.imageUrl = picture.thumb;
        }
        obj.path = picture.path;
        return obj;

    },
    getPictureDetail:function (picture_id) {
        var me = this;
        var params = {};
        params.id = picture_id;

        message.show_loading();
        api.getPictureDetail( params , function (response) {
            message.hide_loading()
            if( response.status==1 ){
                wx.setNavigationBarTitle({
                  title: response.data.title,
                })
                me.setData({
                    picture: response.data,
                    has_load: true
                })
            }else{
                message.show_error( response.message );
            }
        })
    },
    previewImage:function( e ){

        var url = e.currentTarget.dataset.url;
        var urls = this.data.picture.image_list
        wx.previewImage({
          urls: urls,
          current: url
        })

    },
    swiperChange:function (e) {
        var current = e.detail.current;
        this.setData({
            current: current
        })
        
    }
    
})