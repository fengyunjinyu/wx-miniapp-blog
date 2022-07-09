var message = {}

/**
 * 操作成功 
 * 消息提示框
 */
message.success = function( str_message  , cb ){
    wx.showToast({
        title: str_message,
        icon:'success'
    })

    if(cb!=null){
      cb();
    }
}

/**
 * 操作失败消息提示框
 */
message.error = function(str_msg){
    wx.showToast({
      title: str_msg,
      icon:'error'
    })

}

/**
 * 显示普通消息
 */
message.toast = function( str_msg ){
    wx.showToast({
      title: str_msg,
      icon:'none'
    })
}



message.show_error = function(str_message , cb , confirm_text){

  if(confirm_text==null || confirm_text==undefined){
    confirm_text="确定"
  }

  var options = {};
  options.content = str_message;
  //options.cancelText = cancel_text;
  options.confirmText = confirm_text;
  options.showCancel = false;

  options.success = function(res){
    if(res.confirm){
      if(cb){
        cb();
      }
    }
  }
  wx.showModal( options );
}

message.show_success = function (str_message , cb , confirm_text, str_title) {

  var options = {};

  if(confirm_text==null || confirm_text==undefined){
    confirm_text="确定"
  }

  options.content = str_message;
  //options.cancelText = cancel_text;
  options.confirmText = confirm_text;
  options.showCancel = false;

  options.success = function(res){
    if(res.confirm){
      if(cb){
        cb();
      }
    }
  }
  wx.showModal( options );
  
}

message.action_success = function(  str_title , str_message , confirm_text , cb){

  var options = {};

  if(confirm_text==null || confirm_text==undefined){
    confirm_text="确定"
  }

  options.content = str_message;
  //options.cancelText = cancel_text;
  options.confirmText = confirm_text;
  options.showCancel = false;

  options.success = function(res){
    if(res.confirm){
      if(cb){
        cb();
      }
    }
  }
  wx.showModal( options );

}

/**
 * 弹出框提示 加载错误
 * @param {*} message_content 
 */
message.alertError = function( message_content ){

  var options = {};

  options.content = message_content;
  //options.cancelText = "";
  options.confirmText = "确定";
  options.showCancel = false;

  /*
  if(str_title!=null  && str_title!=false && str_title!=undefined){
    options.title = str_title;
  }
  */

  options.success = function(){

  };


  wx.showModal(options)

}

/**
 * 弹出对话框
 */
message.alert = function(str_title , str_message , cancel_text , confirm_text , cb){


  var options = {};

  options.content = str_message;
  options.cancelText = cancel_text;
  options.confirmText = confirm_text;

  if(str_title!=null  && str_title!=false && str_title!=undefined){
    options.title = str_title;
  }
  options.success = cb;
  wx.showModal(options)
}

message.showPay = function( cb){

  wx.showModal({
      title:'提示',
      content:'订单已创建，请尽快支付',
      cancelText:'查看订单',
      confirmText:'立即支付',
      confirmColor:'#3388ff',
      success:function( res ){

        cb(res)
        /*
          if(res.confirm){
              //跳转到支付
              wx.navigateTo({
                url: '/pages/pay/pay?order_no='+result.data.order_no,
              })

          }else{
              //跳转到订单详情

              wx.navigateTo({
                url: '/pages/order-detail/order-detail?order_no='+result.data.order_no,
              })
          }

          */

      }
  })

}


message.confirm = function(str_message ,  confirm_text , cancel_text ,cb){

  if(!confirm_text){
    confirm_text="确定"
  }

  if(!cancel_text){
    cancel_text="取消"
  }

  wx.showModal({
    title:'提示',
    content: str_message,
    cancelText:cancel_text,
    confirmText:confirm_text,
    confirmColor:'#3388ff',
    success:function (res) {
      if(res.confirm){
        cb(1)
      }else{
        cb(0)
      }
    },

  })

}


/**
 * 
 */

message.show_loading = function (str_title) {
  if(!str_title){
    str_title="正在加载中"
  }
    wx.showLoading({
      title: str_title,
      mask: true
    })
}

message.hide_loading = function ( cb ) {

  setTimeout(function (params) {
      wx.hideLoading({
        success: (res) => {
          if(cb){
            cb();
          }
        },
      })
  } ,500)
}



module.exports = message





