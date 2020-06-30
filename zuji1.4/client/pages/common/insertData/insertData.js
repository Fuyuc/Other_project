// pages/insertData/insertData.js

var util = require('../../../utils/util.js');
var app = getApp()

Page({

  data: {
    nowPerson: '我',

    rankArray: ['不详', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
    rankIndex: 0,

    relationArray: ['父亲', '母亲', '兄弟姐妹', '妻子', '子女'],
    relationIndex: 0,

    date: '2016-09-01',
  },

  /**
   * 选择关系
   */
  bindRelationChange: function (res) {
    this.setData({
      relationIndex: res.detail.value
    })
  },

  /**
   * 选择排行
   */
  bindRankChange: function (res) {
    this.setData({
      rankIndex: res.detail.value
    })
  },

  /**
   * 选择日期
   */
  bindDateChange: function (res) {
    this.setData({
      date: res.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var date = util.formatDate(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      date: date
    });
  },

  /**
   * 提交form表单数据
   */
  formSubmit: function (res) {

    app.globalData.person_list[app.globalData.list_index] = res.detail.value
    app.globalData.list_index += 1
    wx.navigateBack({
      delta: 1
    })
    // var that = this;
    // var formData = res.detail.value;
    // wx.request({
    //   url: 'http://test.com:8080/test/socket.php?msg=2',
    //   data: formData,
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     that.modalTap();
    //   }
    // })
  },

  /**
   * 清空form表单数据
   */
  formReset: function () {
    console.log('form发生了reset事件');
  }
})