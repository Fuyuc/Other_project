// pages/mine/custom_service/custom_service.js
Page({

  data: {
    phonecall: '13576941332'
  },

  phonecallevent: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.phonecall
    })
  }
})


