// pages/action/action.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 'show1',
    back: 'back1',
    inputVal: "",
    // 轮播图
    movies: [
      { url: '../../images/homePage/moves1.jpg' },
      { url: '../../images/homePage/moves2.jpg' },
      { url: '../../images/homePage/moves3.jpg' },
      { url: '../../images/homePage/moves4.jpg' }
    ],
    // 功能列表
    actoionList: [
      { 'url': 'findRoot/findRoot', 'pic': '../../images/homePage/seek.png', 'title': '寻根' },
      { 'url': 'picFind/picFind', 'pic': '../../images/homePage/image.png', 'title': '传图寻亲' },
      { 'url': 'myFamily/myFamily', 'pic': '../../images/homePage/family.png', 'title': '我的家族' },      
      { 'url': 'nearbyAct/nearbyAct', 'pic': '../../images/homePage/activity.png', 'title': '附近活动' },
      { 'url': 'relation/relation', 'pic': '../../images/homePage/relation.png', 'title': '关系换算' },
      // { 'url': '', 'pic': '../../images/homePage/scan.png', 'title': '族谱扫描' },
      { 'url': 'resolveDream/resolveDream', 'pic': '../../images/homePage/dream.png', 'title': '周公解梦' },
      { 'url': 'huangli/huangli', 'pic': '../../images/homePage/laohuangli.png', 'title': '老黄历' },
      { 'url': '', 'pic': '../../images/homePage/more.png', 'title': '更多' },
      { 'url': '', 'pic': '', 'title': '' }
    ],
    // 活动列表
    activityList: [
      {
        "name": "宗亲会", 
        "activityUrl": "nearbyAct/familyAct/chen/chen", 
        "img": "../../images/homePage/chen.jpg", 
        "info": "2018年05月25日，江西义门陈惊艳首届世界家风大会",
      },
      {
        "name": "宗亲会",
        "activityUrl": "nearbyAct/familyAct/li/li",
        "img": "../../images/homePage/li.jpg",
        "info": "2018年04月19日，全球李氏恳亲大会将在河北隆尧县举办",
      },
      {
        "name": "宗亲会",
        "activityUrl": "nearbyAct/familyAct/sun/sun",
        "img": "../../images/homePage/sun.jpg",
        "info": "2016年05月26日，纪念孙中山诞辰150周年 濮阳筹办孙姓起源研讨会",
      },
      
    ]
  },
  showInput: function () {
    this.setData({
      inputShowed: true,
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      show: 'show1',
      back: 'back1'
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
      show:'show2',
      back:'back2'
    });
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