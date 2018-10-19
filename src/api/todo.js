import axios from '@/libs/api.request'
export const createTodo = ({ name, content, type }) => {
  return axios.request({
    url: '/api/todo/create_todo',
    data: {
      name,
      content,
      type
    },
    method: 'post'
  })
}

export const readTodoList = ({ limit = 20, offset = 1, keyword, type }) => {
  return axios.request({
    url: '/api/todo/read_todo_list',
    params: {
      limit,
      offset,
      type,
      keyword
    },
    method: 'get'
  })
}

export const readTodoById = (id) => {
  return axios.request({
    url: '/api/todo/read_todo_by_id',
    method: 'get',
    params: {
      id
    }
  })
}

export const updateTodoById = ({ name, id, type, content }) => {
  return axios.request({
    url: '/api/todo/update_todo_by_id',
    method: 'post',
    data: {
      id,
      name,
      content,
      type
    }
  })
}

export const deleteTodoById = (id, dataStatus) => {
  return axios.request({
    url: '/api/todo/delete_todo_by_id',
    method: 'post',
    data: {
      id,
      dataStatus
    }
  })
}
