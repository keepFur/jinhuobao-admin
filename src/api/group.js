import axios from '@/libs/api.request'
export const createGroup = ({ name, type, userId }) => {
    return axios.request({
        url: '/api/group/create_group',
        data: {
            name,
            type,
            userId
        },
        method: 'post'
    });
};

export const readGroupList = ({ limit = 20, offset = 1, keyword, type }) => {
    return axios.request({
        url: '/api/group/read_group_list',
        params: {
            limit,
            offset,
            isSuper: 1,
            keyword,
            type
        },
        method: 'get'
    });
};

export const readGroupById = (id) => {
    return axios.request({
        url: '/api/group/read_group_by_id',
        method: 'get',
        params: {
            id
        }
    });
};

export const updateGroupById = ({ id, name, type }) => {
    return axios.request({
        url: '/api/group/update_group_by_id',
        method: 'post',
        data: {
            id,
            name,
            type
        }
    });
};

export const deleteGroupById = (id, status) => {
    return axios.request({
        url: '/api/group/delete_group_by_id',
        method: 'post',
        data: {
            id,
            status
        }
    });
};
