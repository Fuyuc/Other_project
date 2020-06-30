// pages/common/pages/selectData/selectData.js
Page({

  // 页面的初始数据
  data: {
    personInfo: {},
    nowId: '',
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    let personInfo = JSON.parse(options.personInfo)
    let nowId = options.nowId
    this.setData({
      personInfo: personInfo,
      nowId: nowId
    })
    console.log(options)
    console.log(this.data.nowId)
  },

  // 修改信息
  updateData: function () {
    let str = JSON.stringify(this.data.personInfo)
    wx.navigateTo({
      url: '../updateData/updateData?personInfo=' + str + '&nowId=' + this.data.nowId,
    })
  }
})