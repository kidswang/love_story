// miniprogram/pages/my/my.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isShow: true,
    clicKmask: true,
    list: [],
  },

  bindGetUserInfo(res) {
    if (res.detail.userInfo) {
      // console.log(res.detail.userInfo)
      this.setData({
        userInfo: res.detail.userInfo,
        isShow: false,
      });
      wx.switchTab({
        url: 'home',
      })
    }
  },
  clickEject(index) {
    // console.log(index);
    let id = index.currentTarget.dataset.index
    for (let i = 0; i < this.data.list.length; i++) {
      if (id == i) {
        Dialog.alert({
          closeOnClickOverlay: true,
          title: '点击确认复制',
          message: this.data.list[i].popup,
        }).then(() => {
          wx.setClipboardData({
            data: this.data.list[i].contact,
            success(res) {
              wx.getClipboardData({
                success(res) {
                  wx.showToast({
                    title: '复制成功',
                    icon: 'success',
                  })
                }
              })
            }
          })
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        // success
        // console.log(res)
        that.setData({
          userInfo: res.data,
          isShow: false
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // console.log('已授权')

          wx.getUserInfo({
            success: function (res) {
              // success
              // console.log(res);
              that.setData({
                isShow: false,
                userInfo: res.userInfo

              })
              wx.setStorage('userInfo', res.userInfo)
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })

        } else {
          console.log('未授权');
        }
      },
      fail: () => { },
      complete: () => { }
    });

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