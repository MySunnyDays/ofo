// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 45.8038,
    longitude: 126.5350
  },
  bindcontroltap: function (e) {
    // console.log(e);
    switch(e.controlId){
      case 1: 
        this.moveToCenter();
      case 2:
        if(this.flag){
          wx.navigateBack({
            delta:1//返回当前页面
          })
        }else{
          wx.scanCode({
            success: (res) => {
              // console.log(res);
              wx.showLoading({
                title: '正在获取密码',
              })
              wx.request({
                url: "https://www.easy-mock.com/mock/59ddf8fcc09842759ae6000d/ofodata/ofo#!method=get",
                success: (res) => {
                  // console.log(res);
                  wx.redirectTo({
                    url: '../scanCode/scanCode?password=' + res.data.data.password + "&number=" + res.data.data.unmber,//url可以传递一定的数据。。。
                  })
                }
              })
            }
          })
        }
        break;
      case 3: 
        wx.navigateTo({
          url: '../warn/warn',
        })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.flag = options.flag
    wx.getLocation({
      success:(res) => {//改变this指向
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          controls: [{
            id: 1,
            iconPath: "/images/location.png",
            position: {
              width: 50,
              height: 50,
              left: 20,
              top: res.windowHeight - 80
            },
            clickable: true 
          }, {
            id: 2,
            iconPath: "/images/use.png",
            position: {
              width: 90,
              height: 90,
              left: res.windowWidth / 2 - 40 ,
              top: res.windowHeight - 100
            },
            clickable: true
            }, {
              id: 3,
              iconPath: "/images/warn.png",
              position: {
                width: 50,
                height: 50,
                left: res.windowWidth - 70,
                top: res.windowHeight - 80
              },
              clickable: true
          }, {
            id: 4,
            iconPath: "/images/marker.png",
            position: {
              width: 35,
              height: 50,
              left: res.windowWidth / 2 - 17.5,
              top: res.windowHeight / 2 - 50 
            }
            }, {
              id: 5,
              iconPath: "/images/avatar.png",
              position: {
                width: 50,
                height: 50,
                left: res.windowWidth - 70,
                top: res.windowHeight - 150
              },
              clickable: true
            }]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.map = wx.createMapContext("ofoMap")
    this.moveToCenter();
  },
  moveToCenter: function () {
    this.map.moveToLocation();
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})