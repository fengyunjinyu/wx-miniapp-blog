// index.js
import api from "../../util/api";
import message from "../../util/message";

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        article_list:[],
        has_load:false,
        page_index:1,
        skin:'',
        cat_index:0,
        category_id:-1,
        no_data:false,
        no_more_data:false
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

        this.getIndex();

    

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
    
    getArticleList:function(){

        var params = {};
        params.page_index = this.data.page_index;

        message.show_loading();
        api.getArticleList( {} , function( response ){

            message.hide_loading();
            if(response.status==1){
                console.log(response)

            }else{

            }
        })
    },
    getMore:function(){
        var me = this;
        this.data.page_index++;
        //message.show_loading();

        if(this.data.no_data){
            return;
        }
        if( this.data.no_more_data){
            return
        }


        var page_index = this.data.page_index;
        page_index++;
        var params = {};
        params.page_index = page_index;
        //params.category_id = this.data.category_id;

        message.show_loading();
        api.getIndex( params , function (response) {
            message.hide_loading();
            if( response.status==1 ){
                var no_data = true;
                var no_more_data = false;


                if(response.data.article_list.length<10){
                    no_more_data = true
                }


                var article_list = me.data.article_list;

                article_list = article_list.concat( response.data.article_list )

                me.setData({
                    article_list: article_list,
                    no_more_data: no_more_data,
                    page_index: page_index
                })

            }else{

            }
        })

    },
    getIndex:function(){
        var me = this;

        //message.show_loading();

        api.getIndex( {} , function( response ){
            if( response.status==1 ){
                me.setData({
                    category_list: response.data.category_list,
                    article_list: response.data.article_list
                })
            }else {
                me.show_error( response.message );
            }
        })
    },
    swiperChange:function(e){
        var index = e.detail.current;

        var category = this.data.category_list[index];

        if(category){
            this.setData({
                cat_index: index,
                category_id: category.id
            })
        }
    }
})