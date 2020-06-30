// pages/insertData/insertData.js

var app = getApp()

Page({

  data: {
    nowPerson: '我',

    rankArray: ['不详', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
    rankIndex: 0,

    relationArray: ['父亲', '母亲', '兄弟姐妹', '妻子', '子女'],
    relationIndex: 0,

    personInfo: {},
    nowId: '',
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    console.log(options)
    let personInfo = JSON.parse(options.personInfo)
    let nowId = options.nowId
    this.setData({
      personInfo: personInfo,
      nowId: nowId
    })
  },

  // 选择关系
  bindRelationChange: function (res) {
    this.setData({
      relationIndex: res.detail.value
    })
  },

  // 选择排行
  bindRankChange: function (res) {
    this.setData({
      rankIndex: res.detail.value
    })
  },

  // 选择日期
  bindDateChange: function (res) {
    this.setData({
      date: res.detail.value
    })
  },

  // 提交form表单数据
  formSubmit: function (res) {
    app.globalData.person_list[this.data.nowId] = res.detail.value
    wx.navigateBack({
      delta: 2
    })
  },

  // 清空form表单数据
  formReset: function () {
    console.log('form发生了reset事件');
  }
})