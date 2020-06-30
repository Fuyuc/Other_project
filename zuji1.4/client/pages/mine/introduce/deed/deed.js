var app = getApp()

Page({
  data: {
    date: '选择时间',
  },

  //获取时间选择器信息
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  //保存信息
  formSubmit: function (e) {
    if (e.detail.value.title && e.detail.value.date != '选择时间') {
      app.globalData.deed[app.globalData.deed_num] = e.detail.value
      app.globalData.deed_num += 1

      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1000
      })

      setTimeout(function () {
        wx.navigateBack()
      }, 300)
    }

    else if (!e.detail.value.title) {
      wx.showModal({
        title: '提示信息',
        content: '请输入标题',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

    else {
      wx.showModal({
        title: '提示信息',
        content: '请选择时间',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },


})
