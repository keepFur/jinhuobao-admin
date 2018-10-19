import axios from '@/libs/api.request'
export const createDiscount = ({ title, content, groupId, media, authorId }) => {
  return axios.request({
    url: '/api/discount/create_discount',
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

export const readDiscountList = ({ limit = 20, offset = 1, keyword }) => {
  return axios.request({
    url: '/api/discount/read_discount_list',
    params: {
      limit,
      offset,
      isSuper: 1,
      keyword
    },
    method: 'get'
  })
}

export const readDiscountById = (id) => {
  return axios.request({
    url: '/api/discount/read_discount_by_id',
    method: 'get',
    params: {
      id
    }
  })
}

export const updateDiscountById = (id, { title, content }) => {
  return axios.request({
    url: '/api/discount/update_discount_by_id',
    method: 'post',
    data: {
      id,
      title,
      content
    }
  })
}

export const deleteDiscountById = (id, status) => {
  return axios.request({
    url: '/api/discount/delete_discount_by_id',
    method: 'post',
    data: {
      id,
      status
    }
  })
}
