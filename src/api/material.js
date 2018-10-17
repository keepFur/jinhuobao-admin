import axios from '@/libs/api.request';

export const createMaterial = ({ file, groupId, isSuper = 1, type, authorId }) => {
    return axios.request({
        url: '/api/material/create_material',
        data: {
            file,
            authorId,
            isSuper,
            groupId,
            type
        },
        method: 'post'
    });
};

export const readMaterialList = ({ limit = 20, offset = 1, isSuper = 1, type }) => {
    return axios.request({
        url: '/api/material/read_material_list',
        params: {
            limit,
            offset,
            isSuper,
            type
        },
        method: 'get'
    });
};

export const readMaterialById = (id) => {
    return axios.request({
        url: '/api/material/read_material_by_id',
        method: 'get',
        params: {
            id
        }
    });
};

export const updateMaterialById = (id, { groupId }) => {
    return axios.request({
        url: '/api/material/update_material_by_id',
        method: 'post',
        data: {
            id,
            groupId
        }
    });
};

export const deleteMaterialById = (id) => {
    return axios.request({
        url: '/api/material/delete_material_by_id',
        method: 'post',
        data: {
            id
        }
    });
};
