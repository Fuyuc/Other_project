var relationship = require("../../../utils/relationship.js");


Page({
  data: {
    duixiang: '我称呼Ta',
    duiFlag: true,
    relation_result: '',
    inputText: '',
    first: true,
    sex: 1,
    isMan: true,
    options: {
      text: '',		//输入的文本
      sex: 1,			//自己的性别：0女性,1男性
      type: 'default',		//转换类型：'default'算称谓,'chain'算关系(此时reverse无效)
      reverse: false		//称呼方式：true对方称呼我,false我称呼对方
    }
  },
  getValue: function (e) {
    var that = this;
    var value = e.currentTarget.dataset.text;
    var nowText = that.data.inputText;
    if (that.data.first) {
      that.setData({
        first: false
      })
    } else {
      nowText += '的';
    }

    nowText += value;
    that.setData({
      inputText: nowText
    })
    console.log(that.data.inputText);
  },
  show: function () {
    var that = this;
    var options = that.data.options;
    options.text = that.data.inputText;
    console.log("options: ", options);
    var showR = relationship(options);
    console.log("showR: ", showR);
    if(showR.length == 0){
      that.setData({
        relation_result: '关系太久远啦！',
        inputText: '',
        first:true
      });
    }else{
      that.setData({
        relation_result: showR,
        inputText: that.data.inputText
      });
    }
    
  },
  switch1Change: function () {
    var that = this;
    that.setData({
      isMan: !that.data.isMan
    });
    if (that.data.isMan) {
      that.setData({
        sex: 1
      })
    } else {
      that.setData({
        sex: 0
      })
    }
    console.log('0女1男：' + that.data.sex);
  },
  clear: function () {
    var that = this;
    that.setData({
      inputText: "",
      relation_result: "",
      first: true
    })
  },
  clearOnce: function() {
    var that = this;
    var text = that.data.inputText;
    if (text.length == 2){
      text = text.substr(0, text.length - 1);
      text = text.substr(0, text.length - 1);
    }else{
      text = text.substr(0, text.length - 1);
      text = text.substr(0, text.length - 1);
      text = text.substr(0, text.length - 1);
    }
    that.setData({
      inputText: text
    })
    
    console.log("text: "+ text);
  },
  changeDui: function () {
    var that = this;
    that.setData({
      duiFlag: !that.data.duiFlag
    });
    if (that.data.duiFlag) {
      that.setData({
        duixiang: "我称呼Ta"
      })
    } else {
      that.setData({
        duixiang: "Ta称呼我"
      })
    }
    console.log(that.data.duixiang);

    that.data.options.reverse = !that.data.options.reverse;
    that.show();


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
