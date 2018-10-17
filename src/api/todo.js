import axios from '@/libs/api.request'
export const createTodo = ({ title, content, groupId, media, authorId = 1 }) => {
    return axios.request({
        url: '/api/todo/create_todo',
        data: {
            title,
            content,
            groupId,
            authorId,
            media
        },
        method: 'post'
    });
};

export const readTodoList = ({ limit = 20, offset = 1, keyword }) => {
    return axios.request({
        url: '/api/todo/read_todo_list',
        params: {
            limit,
            offset,
            isSuper: 1,
            keyword
        },
        method: 'get'
    });
};

export const readTodoById = (id) => {
    return axios.request({
        url: '/api/todo/read_todo_by_id',
        method: 'get',
        params: {
            id
        }
    });
};

export const updateTodoById = ({ groupId, id, title, content }) => {
    return axios.request({
        url: '/api/todo/update_todo_by_id',
        method: 'post',
        data: {
            id,
            title,
            content,
            groupId
        }
    });
};

export const deleteTodoById = (id, status) => {
    return axios.request({
        url: '/api/todo/delete_todo_by_id',
        method: 'post',
        data: {
            id,
            status
        }
    });
};
