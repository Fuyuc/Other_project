// pages/chart/index.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    family: {

      rank_1: {
        1: {
          id: 1,
          name: '陈思墀',
          childrenID: [2, 3, 4],
          fatherID: 0,
          summary: '暂无'
        },
      },

      rank_2: {
        2: {
          id: 2,
          name: '陈彦清',
          childrenID: [5, 6, 7],
          fatherID: 1,
          summary: '思墀长子,行月九百又十六,生于光绪庚子年二月初三日卯时。娶上边程氏,生于宣统辛亥年七月廿三日戌时。生子三:翊盛、翊欣、翊瑞'
        },
        3: {
          id: 3,
          name: '陈彦宝',
          childrenID: [8, 9],
          fatherID: 1,
          summary: '思墀次子,行月九百九十三,生于光绪戊申年正月初七日午时。娶氏。子女。'
        },
        4: {
          id: 3,
          name: '陈彦俊',
          childrenID: [],
          fatherID: 1,
          summary: '思墀三子,行月千十四,生于宣统庚戌年七月廿七日寅时。娶氏,子女。'
        },
      },

      rank_3: {
        5: {
          id: 5,
          name: '陈翊盛',
          childrenID: [10],
          fatherID: 2,
          summary: '彦清之子,生于一九四五年六月二十四日,大学。娶宜春市钟桂芳,生于一九四八年七月四日。生子一:圣鑫。女一:陈莹,生于一九七二年十月六日,适贵州安顺市勾忠毅。'
        },
        6: {
          id: 6,
          name: '陈翊欣',
          childrenID: [11],
          fatherID: 2,
          summary: '彦清次子,生于一九四零年十二月五日,大学。娶南昌市滕滨,生于一九四一年五月九日,大学。生子一:圣荣。女一:陈漓,生于一九七五年十一月十九日,大学。'
        },
        7: {
          id: 7,
          name: '陈翊瑞',
          childrenID: [12],
          fatherID: 2,
          summary: '彦清三子,生于一九四六年十二月三十日,大学,殁于一九八三年四月十四日,葬宜春市白泥山。娶张凤云,生于一九四九年七月二十六日。生子一:圣涛。'
        },
        8: {
          id: 8,
          name: '陈翊龙',
          childrenID: [13, 14, 15, 16, 17],
          fatherID: 3,
          summary: '彦宝长子,行盈九百,生于公元一九四九年己丑十月初十日,殁于二零一三年十二月二十一'
        },
        9: {
          id: 9,
          name: '陈翊有',
          childrenID: [19],
          fatherID: 3,
          summary: '彦宝次子,行盈九百十八,生于公元一九五三年癸巳五月一日,高中,殁于二零一二年十二月六日,葬祠堂右侧坐北向南。娶邹家垅李火秀,生于公元一九五九年己亥十一月十五日巳时。生子一:圣强。女二:长女水兰,生于一九八零年正月,适金桥聂家聂隆晓;次女小兰,生于一九九一年十二月,适象山蔡家洼熊运保。'
        },
      },
    },

    size: {},

    node: {},

    value: {
      y_rank_1: 100,
      y_rank_2: 200,
      y_rank_3: 300,

      spacing: 10,

      block_width: 50,
      block_height: 40,
    },
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setSize()
    this.setNode()
    this.drawChart()
  },


  /**
   * 计算每个节点在树谱图上的x轴方向上所占据的尺寸
   */
  setSize: function () {

    // 尺寸
    var size = {
      rank_1: {},
      rank_2: {},
      rank_3: {},
    }

    // 参数
    const family = this.data.family
    const value = this.data.value
    var oneSize = value.block_width + value.spacing

    // 计算 rank_3 尺寸
    for (var id in family.rank_3) {
      size.rank_3[id] = oneSize
    }

    // 计算 rank_2 尺寸
    for (var id in family.rank_2) {
      size.rank_2[id] = 0
      for (var i = 0; i < family.rank_2[id].childrenID.length; i++) {
        size.rank_2[id] += size.rank_3[family.rank_2[id].childrenID[i]]
      }
      if (size.rank_2[id] == 0) {
        size.rank_2[id] = oneSize
      }
    }

    // 计算 rank_1 坐标
    for (var id in family.rank_1) {
      size.rank_1[id] = 0
      for (var i = 0; i < family.rank_1[id].childrenID.length; i++) {
        size.rank_1[id] += size.rank_2[family.rank_1[id].childrenID[i]]
      }
      if (size.rank_2[id] == 0) {
        size.rank_1[id] = oneSize
      }
    }

    // console.log(size)
    this.setData({
      size: size
    })
  },


  /**
   * 计算每个个人节点在树谱图上的坐标
   */
  setNode: function () {

    // 节点坐标
    var node = {
      rank_1: {},
      rank_2: {},
      rank_3: {},
    }

    // 参数
    const family = this.data.family
    const size = this.data.size
    const value = this.data.value

    // 计算 rank_1 坐标
    var x_pointer = 0
    var x
    for (var id in family.rank_1) {
      x = x_pointer + size.rank_1[id] / 2
      node.rank_1[id] = [x, value.y_rank_1]
      x_pointer += size.rank_1[id]
    }

    // 计算 rank_2 坐标
    x_pointer = 0
    for (var id in family.rank_2) {
      x = x_pointer + size.rank_2[id] / 2
      node.rank_2[id] = [x, value.y_rank_2]
      x_pointer += size.rank_2[id]
    }

    // 计算 rank_3 坐标
    x_pointer = 0
    for (var id in family.rank_3) {
      x = x_pointer + size.rank_3[id] / 2
      node.rank_3[id] = [x, value.y_rank_3]
      x_pointer += size.rank_3[id]
    }

    // console.log(node)
    this.setData({
      node: node
    })
  },


  /**
   * 绘制树谱图
   */
  drawChart: function () {

    // 画布设置
    const ctx = wx.createCanvasContext('myCanvas')

    ctx.setFontSize(15)
    ctx.setTextBaseline('middle')
    ctx.setTextAlign('center')
    ctx.setStrokeStyle('red')

    // 参数
    const node = this.data.node
    const family = this.data.family
    const value = this.data.value

    // 描述第一代的图像
    for (var id in family.rank_1) {

      // 描述节点
      ctx.fillText(family.rank_1[id].name, node.rank_1[id][0] + value.block_width / 2, node.rank_1[id][1] + value.block_height / 2)
      ctx.strokeRect(node.rank_1[id][0], node.rank_1[id][1], value.block_width, value.block_height)

      // 描述线
      for (var i = 0; i < family.rank_1[id].childrenID.length; i++) {
        ctx.beginPath()
        ctx.moveTo(node.rank_1[id][0] + value.block_width / 2, node.rank_1[id][1] + value.block_height)
        ctx.lineTo(node.rank_2[family.rank_1[id].childrenID[i]][0] + value.block_width / 2, node.rank_2[family.rank_1[id].childrenID[i]][1])
        ctx.stroke()
      }
    }

    // 描述第二代的图像
    for (var id in family.rank_2) {

      // 描述节点
      ctx.fillText(family.rank_2[id].name, node.rank_2[id][0] + value.block_width / 2, node.rank_2[id][1] + value.block_height / 2)
      ctx.strokeRect(node.rank_2[id][0], node.rank_2[id][1], value.block_width, value.block_height)

      // 描述线
      for (var i = 0; i < family.rank_2[id].childrenID.length; i++) {
        ctx.beginPath()
        ctx.moveTo(node.rank_2[id][0] + value.block_width / 2, node.rank_2[id][1] + value.block_height)
        ctx.lineTo(node.rank_3[family.rank_2[id].childrenID[i]][0] + value.block_width / 2, node.rank_3[family.rank_2[id].childrenID[i]][1])
        ctx.stroke()
      }
    }

    // 描述第三代的图像
    for (var id in family.rank_3) {

      // 描述节点
      ctx.fillText(family.rank_3[id].name, node.rank_3[id][0] + value.block_width / 2, node.rank_3[id][1] + value.block_height / 2)
      ctx.strokeRect(node.rank_3[id][0], node.rank_3[id][1], value.block_width, value.block_height)
    }

    ctx.draw()
  },


  /**
   * 每个节点的操作菜单
   */
  menu: function (person) {
    let str = JSON.stringify(person);
    wx.showActionSheet({
      itemList: ['查看', '其他'],
      success: function (res) {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: 'personInfo/personInfo?str=' + str,
          })
        } else if (res.tapIndex === 1) {
        }
      }
    })
  },


  /**
   * 响应移动
   */
  // touchMove: function (e) {
  //   const ctx = wx.createCanvasContext('myCanvas')

  //   ctx.translate(20, 20)

  //   ctx.draw()
  // },


  /**
   * 响应点击
   */
  touchStart: function (e) {

    // 获得触摸坐标
    var touch_x = e.changedTouches[0].x
    var touch_y = e.changedTouches[0].y

    // 参数
    const family = this.data.family
    const node = this.data.node
    const value = this.data.value

    for (var id in node.rank_1) {
      var x = touch_x - node.rank_1[id][0]
      var y = touch_y - node.rank_1[id][1]
      if (x >= 0 && x <= value.block_width && y >= 0 && y <= value.block_height) {
        this.menu(family.rank_1[id])
        return
      }
    }

    for (var id in node.rank_2) {
      var x = touch_x - node.rank_2[id][0]
      var y = touch_y - node.rank_2[id][1]
      if (x >= 0 && x <= value.block_width && y >= 0 && y <= value.block_height) {
        this.menu(family.rank_2[id])
        return
      }
    }

    for (var id in node.rank_3) {
      var x = touch_x - node.rank_3[id][0]
      var y = touch_y - node.rank_3[id][1]
      if (x >= 0 && x <= value.block_width && y >= 0 && y <= value.block_height) {
        this.menu(family.rank_3[id])
        return
      }
    }
  }
})