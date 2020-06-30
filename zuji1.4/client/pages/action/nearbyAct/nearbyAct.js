Page({
  /**
   * 页面的初始数据
   */
  data: {
    scale: 18,
    //标记点
    markers: [{
      iconPath: "../../../images/location.png",
      latitude: 28.680250,
      longitude: 116.031930
    }],
    //圆
    circles: [{
      latitude: 28.680250,
      longitude: 116.031930,
      color: '#FF0000DD',
      fillColor: '#7cb5ec88',
      radius: 100,
      strokeWidth: 1
    }],
    //放大缩小功能控件
    controls: [{
      id: 1,
      iconPath: "../../../images/down.png",
      position: {
        left: 350,
        top: 300 - 50,
        width: 30,
        height: 30
      },
      clickable: true
    },
    {
      id: 2,
      iconPath: "../../../images/up.png",
      position: {
        left: 350,
        top: 350 - 50,
        width: 30,
        height: 30
      },
      clickable: true
    }
    ]
  },
  //事件，打开微信地图
  click: function (e) {
    wx.openLocation({
      latitude: 28.680250,
      longitude: 116.031930,
      scale: 18,
      iconPath: "../../../images/location.png",
      name: '江西师范大学（瑶湖校区）',
      address: '江西省南昌市南昌县紫阳大道99号'
    })
  },
  //点击缩放按钮动态请求数据
  controltap(e) {
    var that = this;
    console.log("scale===" + this.data.scale)
    if (e.controlId === 1) {
      // if (this.data.scale === 18) {
      that.setData({
        scale: --this.data.scale
      })
      // }
    } else {
      //  if (this.data.scale !== 18) {
      that.setData({
        scale: ++this.data.scale
      })
      // }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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