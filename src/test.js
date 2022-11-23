getScreenData = (callback) => {
  clueListNavigationInfoAction({ cluePageType: 'B' }, (res, status) => {
    if (status) {
      const clueStatus = [...res.data.clueStatus]
      clueStatus.map((item) => {
        item.tab0 = item.title
        item.id = item.code
        item.key = 'tab0'

        if (this.state.params.followState == item.code) {
          item.isSelect = true
        }
      })
      this.selectType.tab0 = clueStatus
      this.setState({ screenData: res.data })

      const array = res.data.weightDict
      if (array && !this.state.params.weight) {
        for (let i = 0; i < array.length; i++) {
          const ele = array[i]
          if (ele.code == '2') {
            this.state.params = {
              ...this.state.params,
              weight: ele.code,
            }
          }
        }
      }
      callback(res.data)
    } else {
      this.setState({ screenData: {} })
      callback(false)
    }
  })
}


