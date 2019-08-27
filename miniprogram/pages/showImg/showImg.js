// pages/showImg/showImg.js
const db = wx.cloud.database()
let collection = db.collection('xhhxhhimgbook')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:''
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
  callImgUpload(){
    let that=this
    console.log("添加图片")
    wx.chooseImage({
      count:1,
      success: function(res) {
        let filePath=res.tempFilePaths[0]
        let cloudPath="xhh-douban-book"+new Date().getTime()
        console.log("filePath,cloudPath")
        that.addImg(filePath,cloudPath)
      },
    })
  },
  addImg(filePath,cloudPath){
    wx.cloud.uploadFile({
      filePath,
      cloudPath,
      success:res=>{
        console.log(res)
        this.setData({
          imgUrl:res.fileID
        })
        collection.add({
          data:res,
          success:res=>{
            console.log(res)
            wx.showLoading({
              title: '照片添加成功',
            })
          }
        })
      }
    })
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