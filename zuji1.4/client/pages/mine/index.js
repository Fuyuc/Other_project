// page/mine/mine.js
Page({
  data: {
    title_array_1: [
      {
        id: 'grant',
        name: '权限',
        url: '/pages/mine/permission/permisson',
        image_src: '/images/mine/grant.svg'
      }
    ],

    title_array_2: [
      {
        id: 'diary',
        name: '日志',
        url: '/pages/mine/diary/diary',
        image_src: '/images/mine/diary.svg'
      }, {
        id: 'group',
        name: '通讯录',
        url: '/pages/mine/group/group',
        image_src: '/images/mine/book.svg'
      }, {
        id: 'print',
        name: '打印',
        image_src: '/images/mine/print.svg'
      }
    ],

    title_array_3: [
      {
        id: 'about',
        name: '关于',
        url: '/pages/mine/about/about',
        image_src: '/images/mine/about.svg'
      }
    ],

    phonecall: '13576941332'

  },

  //联系客服
  phonecallevent: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.phonecall
    })
  }
})


