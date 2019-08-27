const db = wx.cloud.database()
let collection = db.collection('xhhbook')
Page({
  data:{
    page:1,
    books:[],
    imgUrl:'',
    is:true,
  },
  onLoad() {
    this.getBookList(true)
  },
  onShow(){
    this.setData({
      books:[],
      page:1
    })
  },
  getBookList(isInit) {
    wx.showLoading()
    let offset = 2
    collection.skip(this.data.page * offset).limit(offset).get({
      succecc: res => {
        if (isInit) {
          this.setData({
            books: res.data
          })
        } else {
          this.setData({
            books: res.data.concat(res.data)
          })
        }
        if (res.data.length < offset) {
            this.setData({
              isReach:false
            })
        }
      }
  
    })
    wx.hideLoading()
  },
  //触底加载
  onReachBottom(){
    if(this.data.isReach){
      this.setData({
        page: this.data.page + 1
      })
      this.getBookList()
    }else{
      wx.showLoading({
        title: '没有更多了...',
      })
    }
   
  },
  callAddFun(isbn) {
    wx.cloud.callFunction({
      name: 'xhh-douban',
      data: {
        isbn: isbn
      },
      success: res => {
        console.log(res)
        let info = res.result
        info.count = 1
        collection.add({
          data: info,
          succecc: res => {
            if (res._id) {
              wx.showToast({
                title: "添加成功",
                icon: 'success',
                duration: 2000
              })

            }
          }

        })
      },
      fail: error => {
        console.log(error)
      }
    })
  },
  addBook() {
    let that=this
    wx.scanCode({
      success: res => {
        console.log(res)
        that.callAddFun(res.result)
      }
    })
  }
})