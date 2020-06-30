// page/mine/diary/diary.js
var util = require('../../../utils/util.js');

Page({

  data: {

    person_num: 1,

    operation: [              //第零项加入，一项删除，二项更新
      {
        url: "/images/mine/add.svg",
        do: '加入了家族',
        background: '#72c050'
      }, {
        url: "/images/mine/close.svg",
        do: '删除了',
        background: '#e24115'
      }, {
        url: "/images/mine/refresh.svg",
        do: '更新了',
        background: '#72c050'
      }
    ],

    operator: '陈某',

    be_operated: '家人',

    date: '',

  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function () {
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var date = util.formatTime(new Date());

    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      date: date
    });
  },


})