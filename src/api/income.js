import axios from '@/libs/api.request'
export const createIncome = ({ title, content, groupId, media, authorId }) => {
  return axios.request({
    url: '/api/income/create_income',
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

export const readIncomeList = ({ limit = 20, offset = 1, keyword }) => {
  return axios.request({
    url: '/api/income/read_income_list',
    params: {
      limit,
      offset,
      isSuper: 1,
      keyword
    },
    method: 'get'
  })
}

export const readIncomeById = (id) => {
  return axios.request({
    url: '/api/income/read_income_by_id',
    method: 'get',
    params: {
      id
    }
  })
}

export const updateIncomeById = (id, { title, content }) => {
  return axios.request({
    url: '/api/income/update_income_by_id',
    method: 'post',
    data: {
      id,
      title,
      content
    }
  })
}

export const deleteIncomeById = (id, status) => {
  return axios.request({
    url: '/api/income/delete_income_by_id',
    method: 'post',
    data: {
      id,
      status
    }
  })
}
