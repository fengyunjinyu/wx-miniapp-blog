import message from './message';

var http = {}

//let api_root = "http://192.168.1.5:8999/web/index.php/applet/";
//体验版外网地址
let api_root = "https://www.hujingx.com/web/index.php/applet/";


/**
 * 
 * @param {*} url 
 * @param {*} data 
 * @param {*} success 
 * @param {*} complete 
 * @param {*} check_login 
 * @param {*} token 
 * @param {*} is_interceptor   是否启动拦截器
 */

function doRequest(  url , data , success , complete , check_login , token , is_interceptor ){
  
  wx.showNavigationBarLoading({
    success: (res) => {},
  })
  wx.request( {
    url: url,
    data: data,
    header: {
      "context-type":"application/json",
      "token": token
    },
    success( res ){

      wx.hideNavigationBarLoading();
       
        if(res.data.status==99){

            message.hide_loading();

          wx.showModal({
            content:  res.data.message,
            confirmText:'立即登录',
            success:function( result ){
              if(result.confirm){
                wx.navigateTo({
                  url: '/pages/login/login',
                });
              }else{
                console.log("点击取消")
              }
            }
          })
          return;
        }
      


        success( res );


        /*

        if(res.data.status==-1){

          message.show_error( res.data.message);
        }else{
          success(res)
        }

        */

      
    }
  })

}


function doGetRequest (  ext_config ,  url , data , success , complete , check_login , is_interceptor){
    /*
    data = Object.assign({
        app_id:app_id,
        //token: wx.getStorageSync("token")
    } , data)

    */

    var req_url  = ext_config.api_url + url + '?app_id=' + ext_config.app_id+ '&app_key=' + ext_config.app_key;
    

    var token = "";
    wx.getStorage({
        key:'token',
        success:function(result){
            token = result.data;
            console.log("获取token");
            console.log(result.data);

            doRequest( req_url , data , success , complete , check_login , token ,is_interceptor );
            
        },
        fail:function(){

            console.log("token 记录不存在");
            doRequest( req_url , data , success , complete , check_login , "" , is_interceptor );
        }
    })
}


http.doGet = function ( url , data , success , complete , check_login , is_interceptor){
    wx.getExtConfig({
        success: function( res ){
            var ext_config = res.extConfig;
            doGetRequest(  ext_config ,url , data, success , complete , check_login , is_interceptor )
        },
    })





    /*
    var token = "";
    wx.getStorage({
        key:'token',
        success:function(result){
            token = result.data;
            console.log("获取token");
            console.log(result.data);

            doRequest( url , data , success , complete , check_login , token ,is_interceptor );
            
        },
        fail:function(){

            console.log("token 记录不存在");
            doRequest( url , data , success , complete , check_login , "" , is_interceptor );
        }
    })

    */
}


function doPost( url , data , success , complete , check_login , token ,is_interceptor ){

    wx.request({
        url: url,
        header:{
          'content-type': 'application/x-www-form-urlencoded',
          "token": token
        },
        method: 'POST',
        data:data,
        success:function( res ){
    
          console.log(res);
          if(res.data.status==99){
    
            message.hide_loading();
            wx.showModal({
              cancelColor: 'cancelColor',
              content:  res.data.message,
              confirmText:'立即去登录',
              success:function( res ){
                if(res.confirm){
                  wx.navigateTo({
                    url: '/pages/login/login',
                  })
                }
              }
            })
            return;
    
          }else{
            success(res)
    
          }
        }
      })

}


function doPostRequest( ext_config , url , data , success , complete , check_login , is_interceptor ){

    var req_url  = ext_config.api_url + url + '?app_id=' + ext_config.app_id+ '&app_key=' + ext_config.app_key;


    wx.getStorage({
        key:'token',
        success:function(result){
            var token = result.data;
            console.log("获取token");
            console.log(result.data);
            doPost( req_url , data , success , complete , check_login , token ,is_interceptor );
            
        },
        fail:function(){
            console.log("token 记录不存在");
            doPost( req_url , data , success , complete , check_login , "" , is_interceptor );
        }
    })

   

    /*
    var token = wx.getStorageSync('token');

    wx.request({
        //url: api_root+url,
        url: api_root+url,
        header:{
        'content-type': 'application/x-www-form-urlencoded',
        "token": token
        },
        method: 'POST',
        data:data,
        success:function( res ){

        console.log(res);
        if(res.data.status==99){

            wx.showModal({
            cancelColor: 'cancelColor',
            content:  res.data.message,
            confirmText:'立即去登录',
            success:function( res ){
                if(res.confirm){
                wx.navigateTo({
                    url: '/pages/me/me',
                })
                }

            }
            })
            return;


        }else{
            success(res)

        }
        }
    })

    */

}

http.doPost=function( url , data , success , complete , check_login , is_interceptor ){
  
  /*
  data = Object.assign({
    app_id: app_id,
    token: wx.getStorageSync("token")
  }, data)

  */


    wx.getExtConfig({
        success: function( res ){
            var ext_config = res.extConfig;
            doPostRequest(  ext_config ,url , data, success , complete , check_login , is_interceptor )
        },
        fail:function( res ){
            message.show_error( "extConfig读取失败" );
        }
    })
  //url+='?app_id='+app_id;

  
}


http.downloadFile = function( url , cb ){




  var url2 = api_root+url
  wx.downloadFile({
    url:url2,
    success:function(){

    }
  })
}




/**
 * 上传文件网络请求接口
 */


 
function uploadFile(ext_config , url , tempFilePath ,formData , cb , token ){



    var req_url  = ext_config.api_url + url + '?app_id=' + ext_config.app_id+ '&app_key=' + ext_config.app_key;
  wx.uploadFile({
    url: req_url,
    header:{
      //'content-type': 'multipart/form-data',
      'content-type': 'application/x-www-form-urlencoded',
      "token": token
    },
    filePath: tempFilePath,
    name: 'file',
    formData:formData,
    success( res ){
      cb(res.data);
    }
  })
}


function doUploadFile2( ext_config ,url , tempFilePath ,formData , cb   ){

    wx.getStorage({
        key:'token',
        success:function(result){
            var token = result.data;
            //doRequest( url , data , success , complete , check_login , token  );
            uploadFile( ext_config , url , tempFilePath ,formData , cb , token )
        
        },
        fail:function(){
            console.log("token 记录不存在");
            //doRequest( url , data , success , complete , check_login , ""  );
            uploadFile( ext_config , url , tempFilePath ,formData , cb , "" );
        }
    })
}
http.doUploadFile = function(  url , tempFilePath ,formData , cb  ){
    wx.getExtConfig({
        success: function( res ){
            var ext_config = res.extConfig;
            doUploadFile2(  ext_config ,url , tempFilePath ,formData , cb  )
        },
        fail:function( res ){
            message.show_error( "extConfig读取失败" );
        }
    })
}



//上传文件
http.uploadFile2 = function( url , tempFilePath ,formData , cb ){
  var url2 = api_root+url;
  wx.uploadFile({
    url: url2,
    filePath: tempFilePath,
    name: 'file',
    formData:formData,
    success( res ){
      cb(res.data);
    }
  })

}


module.exports = http