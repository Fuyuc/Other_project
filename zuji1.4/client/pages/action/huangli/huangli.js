var util = require('../../../utils/util.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"",
    dataInfo:[],
    baiji:""
  },
  bindDateChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    this.laohuangli();
    console.log("22"+this.data.dataInfo)
  },
  laohuangli: function () {
    var that = this;
    console.log("this.date: " + that.data.date);
    
    wx.request({
      url: 'https://v.juhe.cn/laohuangli/d', //接口地址
      data: {
        date: that.data.date,
        key: '878ae5c2fd90f05cec54f7926ce7241f'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        that.dataInfo = res.data.result;
        console.log("dataInfo", that.dataInfo);
        console.log("成功：",res.data);

        that.setData({
          dataInfo: that.dataInfo
        })
        
      },
      fail: function (res) {
        console.log('失败：', res.data)
      },
      complete: function (res) {
        // console.log('完成：', res.data)
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调用函数时，传入new Date()参数，返回值是日期和时间  
    var date = new Date();
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    });  
    console.log("date: " + this.date);
    this.laohuangli();
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