import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

export const getTableData = req => {
  let tableData = []
  doCustomTimes(20, () => {
    tableData.push(Mock.mock({
      id: Date.now(),
      title: Random.ctitle(5, 10),
      content_simple: Random.cparagraph(),
      author: '@name',
      createTime: '@date',
      group: Random.boolean() ? '工作' : '生活'
    }))
  })
  return tableData
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}
