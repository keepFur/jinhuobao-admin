import axios from '@/libs/api.request'
export const createOrder = ({ title, content, groupId, media, authorId }) => {
  return axios.request({
    url: '/api/order/create_order',
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

export const readOrderList = ({ limit = 20, offset = 1, keyword }) => {
  return axios.request({
    url: '/api/order/read_order_list',
    params: {
      limit,
      offset,
      isSuper: 1,
      keyword
    },
    method: 'get'
  })
}

export const readOrderById = (id) => {
  return axios.request({
    url: '/api/order/read_order_by_id',
    method: 'get',
    params: {
      id
    }
  })
}

export const updateOrderById = (id, { title, content }) => {
  return axios.request({
    url: '/api/order/update_order_by_id',
    method: 'post',
    data: {
      id,
      title,
      content
    }
  })
}

export const deleteOrderById = (id, status) => {
  return axios.request({
    url: '/api/order/delete_order_by_id',
    method: 'post',
    data: {
      id,
      status
    }
  })
}
