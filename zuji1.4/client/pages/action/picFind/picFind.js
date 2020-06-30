
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     src:'../../../images/search-min.png'
//   },

//   chooseImage: function(){
//     var _this = this; 
//     wx.chooseImage({
//       count: 1, // 默认9
//       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//       success: function(res) {
//         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//         var tempFilePaths = res.tempFilePaths
//         _this.setData({
//           src: tempFilePaths
//         })  
//       },
//     })
//     // this.setData({
//     //   src: tempFilePaths
//     // })
//   },
//   preview_img: function () {//预览tupia  
//     wx.previewImage({
//       current: this.data.src, // 当前显示图片的http链接  
//       urls: this.data.src // 需要预览的图片http链接列表  
//     })
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
  
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
  
//   }
// })


const app = getApp()

Page({
  data: {
    movies: [
      [{ url: '/images/faceFind/1.jpg', name1: '王沙沙-山东淄博' }, { url: '/images/faceFind/4.jpg', name1: '白会莲-云南楚雄' }, {
        url: '/images/faceFind/3.jpg', name1: '林杰-重庆大足'
      }, { url: '/images/faceFind/2.jpg', name1: '宋明勇-湖南怀化' }, { url: '/images/faceFind/5.jpg', name1: '胡雪芹-安徽合肥' }, { url: '/images/faceFind/6.jpg', name1: '蒋亚东-河南永城' }],

      [{ url: '/images/faceFind/10.jpg', name1: '章士鹏-甘肃合水' }, { url: '/images/faceFind/8.jpg', name1: '张水妹-贵州锦屏' }, {
        url: '/images/faceFind/9.jpg', name1: '方丹石-湖北武汉'
      }, { url: '/images/faceFind/7.jpg', name1: '牟小丽-福建漳州' }, { url: '/images/faceFind/11.jpg', name1: '张亚林-甘肃庆阳' }, { url: '/images/faceFind/12.jpg', name1: '唐飞飞-河南洛阳' }],
    ],

    text1: [
      "寻人启事：马素国，女，籍贯：山东潍坊，出生日期：1971年",
      "寻人启事：李玉花，女，籍贯：山东潍坊，出生日期：1955年",
      "寻找94年送养女儿，女，籍贯：福建漳州，出生日期：1994年",
      "寻人启事：周文举，女，籍贯：安徽涡阳，出生日期：1970年",
      "寻人启事：邱真真，女，籍贯：湖北枣阳，出生日期：1991年"],

    text2: [
      "寻亲生父母：黄碧，女，籍贯：广东，出生日期：1997年",
      "寻亲生父母：麦汝辉，男，籍贯：湖南邵阳，出生日期：1988年1月17日",
      "寻亲生父母：朱伟，男，籍贯：安徽萧县，出生日期：1976年",
      "寻亲生父母：姜秋香，男，籍贯：湖南株洲，出生日期：1988年",
      "寻亲生父母：黄碧，女，籍贯：广东，出生日期：1982年"],


    count_page: 1,     //记录界面页序号

    selected: true,   //tarbar
    selected1: false,

    border: '2rpx solid #e4e4e4',   //边框样式
    border_none: 'none',

    src: "/images/faceFind/face.jpg",
  },

  onSlideChangeEnd: function (e) {
    var that = this;
    that.setData({
      count_page: e.detail.current + 1
    })
  },

  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },

  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },

  chooseImage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        _this.setData({
          src: tempFilePaths
        })
      },
    })
    
  },

  preview_img: function () {//预览图片
    wx.previewImage({
      current: this.data.src, // 当前显示图片的http链接  
      urls: this.data.src // 需要预览的图片http链接列表  
    })
  },
})

