Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataInfo: '',
    date: '0',
    q: '',
  },

  interpret: function () {

    var that = this;

    wx.request({
      url: 'http://v.juhe.cn/dream/query', //接口地址
      data: {
        date: that.data.date,
        key: '9153ddeb82f68fbb0e5cef5018a760ce',
        q: that.data.q
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        that.dataInfo = res.data.result;
        console.log("dataInfo", that.dataInfo);
        console.log("成功：", res.data);

        if (!that.dataInfo) {
          that.dataInfo = [{ title: "提示", des: "未找到相关的梦境解释" }]
        }
        console.log("dataInfo", that.dataInfo);
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

  value_input: function (e) {
    this.setData({
      q: e.detail.value
    })
  }
})