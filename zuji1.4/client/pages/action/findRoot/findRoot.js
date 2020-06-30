
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Style: "list-Style1",
    inputVal: "",
    inputName: "",
    nameArray:[],
    villages:[],
    name: "",
    xing: "",
    region: ['江西省', '南昌市', '南昌县'],
    customItem: '全部',
    
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    var that = this;
    var name = that.data.inputName;
    console.log("用户输入的姓氏：" + name);
    var nameArray = that.data.nameArray;
    // for(var i = 0; i < nameArray.length; i++){
    //   var iName = 
    // }
    //请求对应姓氏的数据
    if (nameArray[name] == undefined){
      // wx.showToast({
      //   title: '请重新输入！',
      //   icon: 'loading',
      //   duration: 1000,
      //   mask: true
      // })
      wx.showModal({
        title: '提示',
        content: '无该姓氏或者输入有误，请重新输入！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }

        }
      })
    }else{
      wx.request({
        url: 'https://zupu.asscc.top/api/V1/Jiapu/GetVillages', //接口地址
        data: {
          familyNameID: that.data.nameArray[name]
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          console.log("请求成功：", res.data);
          that.data.villages = res.data.data;
          console.log("villages", that.data.villages);
          that.setData({
            villages: that.data.villages
          })
        },
        fail: function (res) {
          console.log('失败：', res.data)
        },
        complete: function (res) {
          // console.log('完成：', res.data)
        },
      })
    }
    

    this.setData({
      
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
      inputName:e.detail.value.split("", 1)
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
      url: '../../chart/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toResult:function(e){
    var that = this;
    var namevillage = e.currentTarget.dataset.namevillage;
    let data = JSON.stringify(namevillage);
    wx.navigateTo({
      url: 'result/result?data=' + data + '&xing=' + that.data.inputName
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://zupu.asscc.top/api/V1/Jiapu/GetFamilyNames', //接口地址
      data: {
       
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log("请求成功：", res.data);
        var FamilyNames = res.data.data;
        var existNames = [];
        var name;
        var len = 0;
        for (var i = 0; i < FamilyNames.length; i++){
            if(FamilyNames[i].ID != -1){
              name = FamilyNames[i].Name;
              existNames[name] = FamilyNames[i].ID;
              len++;
            }
        }
        that.data.nameArray = existNames;
        that.data.nameArray.length = len;
        console.log("存在数据的姓氏：", that.data.nameArray);
      },
      fail: function (res) {
        console.log('失败：', res.data)
      },
      complete: function (res) {
        // console.log('完成：', res.data)
      },
    })
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


































// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     /*搜索框*/
//     status: 0,
//     SearchSrc: "../../../images/search-min.png",
//     searchMsg: '快速搜索姓氏',

//     department: [
//       {
//         title: "单姓",
//         departmentList: [
//           { "name": "赵氏", "url": "" },
//           { "name": "钱氏", },
//           { "name": "孙氏" },
//           { "name": "李氏" },
//           { "name": "王氏" },
//           { "name": "张氏" },
//           { "name": "陈氏" },
//           { "name": "丁氏" },
//           { "name": "林氏" }
//         ]
//       },
//       {
//         title: "复姓",
//         departmentList: [
//           { "name": "诸葛氏" },
//           { "name": "欧阳氏" },
//           { "name": "司马氏" },
//           { "name": "上官氏" }
//         ]
//       }
//     ]
//   },

//   /*搜索框聚失焦控制*/
//   /* 文本框聚焦时更改状态*/
//   focus: function (e) {
//     this.setData({
//       status: 1
//     })
//   },
//   /* 文本框失焦时更改状态*/
//   blur: function (e) {
//     this.setData({
//       status: 0
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