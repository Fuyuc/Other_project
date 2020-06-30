
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Style: "list-Style1",
    inputVal: "",
    inputName: "",
    nameArray: [],
    namevillage: [],
    villages: [],
    name: "",
    xing: "",
    summmary:"",
    region: ['江西省', '南昌市', '南昌县'],
    customItem: '全部',
    familyInfo: [
      {
        "info": "陈姓族谱，也就是陈姓大家族里的子孙人等的资料汇总，也是陈姓大家族著名人士的仕履生涯的简括提要，同时也是陈姓大家族著名人生的翔实可靠而又丰富多彩的第一手史料。如同国人各大家族一样，陈姓大家族固然也是讲求等级观念的，所以，家谱中往往会对对于那些曾任高官显宦、封妻荫子、荣宗耀祖者，往往会浓墨重彩。以往，陈姓视耕读为正业，对其他职业采取鄙视态度，如对经商者，即使拥资巨万者，族谱上也只录其姓名而已。"
      },
      {
        "info": "陈（Chén）姓出自舜帝后裔陈胡公，《通志·氏族略》：“舜有二姓，曰姚曰妫。因姚墟之生而姓姚，因妫水之居而姓妫。”后来舜帝部分子孙继承妫姓，为虞舜之后裔。周武王灭商朝纣王以后，建立周朝，找到舜的三十三世后人妫满，并封妫满为诸侯，还把大女儿大姬嫁给他，封国于陈（今河南省淮阳县境内），谥号为胡公，又称胡公满。舜帝的后裔胡公满的子孙有以国为姓的，即成为陈姓的由来。史称姚、虞、陈、胡、田为“妫汭五姓”。“妫汭”，古水名，又作“沩汭”。陈姓在当今中国姓氏排行上第五位，在中国南方是第一大姓，中国人口超过7000多万 ，约占全国汉族人口的5.1%。全世界人口总规模超过9000万。"
      },
    ],
    info: '陈姓族谱，也就是陈姓大家族里的子孙人等的资料汇总，也是陈姓大家族著名人士的仕履生涯的简括提要，同时也是陈姓大家族著名人生的翔实可靠而又丰富多彩的第一手史料。如同国人各大家族一样，陈姓大家族固然也是讲求等级观念的，所以，家谱中往往会对对于那些曾任高官显宦、封妻荫子、荣宗耀祖者，往往会浓墨重彩。以往，陈姓视耕读为正业，对其他职业采取鄙视态度，如对经商者，即使拥资巨万者，族谱上也只录其姓名而已。'

  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      Style: "list-Style2"
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
      name: e.detail.value,
      xing: e.detail.value.split("", 1),
      inputName: e.detail.value.split("", 1)
    });
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  changeToFamily: function () {
    wx.navigateTo({
      url: '../../../chart/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let item = JSON.parse(options.data);
    let xing = options.xing;
    console.log(item);
    that.setData({
      xing: xing,
      name: item.Name,
      summmary: item.Summary
    })
    // console.log("item.Summary:" + item.Summary.split("", 1));
    if (item.Summary == "   " || item.Summary == "    " || item.Summary ==  "  "){
      that.setData({
        summmary: '暂无更多信息，请待更新！'
      })
    }
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
