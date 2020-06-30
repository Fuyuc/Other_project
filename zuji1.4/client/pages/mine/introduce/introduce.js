var app = getApp()

Page({
  data: {
    birthday: '- -',
    relation: '您本人',
    ranking: '- -',
    telphone: '- -',
    tag: '- -',
    brief_intro: '- -',

    arr_time: [],    //存储时间信息
    deed: [],        //存储事迹信息

    id: [],       //保存每个组件的id 
    index: 0,      //每个id
  },


  cutdate: function (e) {
    var deed = this.data.deed;
    console.log("deed")
    var year, month, day, i;
    for (i = 0; i < deed.length; i++) {
      year = deed[i].date.split("-")[0];
      month = deed[i].date.split("-")[1];
      day = deed[i].date.split("-")[2];
    }

    this.setData({
      year: year,
      month: month,
      day: day
    })
  },

  //插入单个事迹组件函数
  insert: function () {
    //跳转到表单(deed)界面
    wx.navigateTo({
      url: '/pages/mine/introduce/deed/deed'
    });

    //定义ID数组
    var id = this.data.id;
    var index = this.data.index;
    id.push(index);
    index++;

    this.setData({
      id: id,
      index: index,
    })
  },

  //删除单个事迹组件函数
  delBind: function (e) {
    var id = this.data.id;          //定义id数组
    var deed = this.data.deed       //定义一个临时数组变量进行操作
    var button_id = e.currentTarget.id;
    var that = this

    //如果删除按钮的绑定id在数组中存在，则删除这个id所绑定的组件
    if (button_id == id[button_id]) {
      delete deed[button_id]

      that.setData({
        deed: deed,
      });
      app.globalData.deed = deed;      //将更新后的数组返还给全局变量
    }
  },


  //编辑单个组件函数
  modify: function (e) {
    wx.navigateTo({
      url: '/pages/mine/introduce/mod_deed/mod_deed'
    });

    var deed = this.data.deed;
    var id = this.data.id;          //定义id数组
    var button_id = e.currentTarget.id;

    if (button_id == id[button_id]) {
      app.globalData.mod_deed = deed[button_id]
      app.globalData.mod_deed_num = button_id         //将该组件的id保存到全局变量中
    }
  },

  //展示从表单输入的数据
  onShow: function () {

    var arr_time = [], i;
    for (i = 0; i < app.globalData.deed.length; i++) {
      while (app.globalData.deed[i] == undefined) {
        i++;
      }
      arr_time[i] = app.globalData.deed[i].date.split("-");
    }

    // if (app.globalData.deed_num != 0) {
    //   wx.showToast({
    //     title: '成功',
    //     icon: 'success',
    //     duration: 1000
    //   })

    this.setData({
      //从全局变量传递保存事迹信息的数组
      deed: app.globalData.deed,
      arr_time: arr_time,
    })

    console.log(app.globalData.deed)
  }
})

