
import axios from '@/libs/api.request'
export const createGoods = ({ title, content, groupId, media, authorId }) => {
  return axios.request({
    url: '/api/goods/create_goods',
    data: {
      title,
      content,
      groupId,
      authorId,
      media
    },
    method: 'post'
  })
}

export const readGoodsList = ({ limit = 20, offset = 1, keyword }) => {
  return axios.request({
    url: '/api/goods/read_goods_list',
    params: {
      limit,
      offset,
      isSuper: 1,
      keyword
    },
    method: 'get'
  })
}

export const readGoodsById = (id) => {
  return axios.request({
    url: '/api/goods/read_goods_by_id',
    method: 'get',
    params: {
      id
    }
  })
}

export const updateGoodsById = (id, { title, content }) => {
  return axios.request({
    url: '/api/goods/update_goods_by_id',
    method: 'post',
    data: {
      id,
      title,
      content
    }
  })
}

export const deleteGoodsById = (id, status) => {
  return axios.request({
    url: '/api/goods/delete_goods_by_id',
    method: 'post',
    data: {
      id,
      status
    }
  })
}
