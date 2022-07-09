// app.js
App({
    onLaunch:function () {
        var me = this;

        let capsuleObj = wx.getMenuButtonBoundingClientRect();
        console.log(capsuleObj);

        wx.getSystemInfo({
          success: (res) => {
            var statusBarHeight = res.statusBarHeight;

            me.globalData.capsuleObj  =  capsuleObj;
            me.globalData.titleHeight = statusBarHeight+capsuleObj.height+(capsuleObj.top-statusBarHeight)*2;



          },
        })
        
    },
    globalData:{
        
    }
})
