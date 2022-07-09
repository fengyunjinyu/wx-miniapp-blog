// commons/custom-header/index.js
var app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {

        

    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    attached:function () {
        this.setData({
            titleHeight: app.globalData.titleHeight,
            capsuleObj: app.globalData.capsuleObj
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
