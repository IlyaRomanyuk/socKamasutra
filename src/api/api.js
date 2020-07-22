import * as axios from 'axios';

let instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "b5d50dee-48f0-4291-a0f8-81f3a529f17f"
    }
})

export const apiFunc = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).
            then(response => {
                return response.data
            })
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`).
            then(response => {
                return response.data
            })
    },

    follow(userId) {
        return instance.post(`follow/${userId}`).
            then(response => {
                return response.data
            })
    },

    setUserOnProfile(userId) {
        return instance.get(`profile/${userId}`).
            then(response => {
                return response.data
            })
    },

    authMe() {
        return instance.get('auth/me').
            then(response => {
                return response.data
            })
    },

    login(email, password, rememberMe) {
        return instance.post('auth/login', { email, password, rememberMe }).
            then(response => {
                return response.data
            })
    },

    logout() {
        return instance.delete('auth/login').
            then(response => {
                return response.data
            })
    }
}


export const profileApi = {

    setStatus(userId) {
        return instance.get(`profile/status/${userId}`).
            then(response => {
                return response.data
            })
    },

    updateStatus(status) {
        return instance.put(`profile/status`, { status: status }).
            then(response => {
                return response.data
            })
    }, 

    savePhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).
            then(response => {
                return response.data
            })
    },
    
    saveProfile(formData) {
        return instance.put(`profile`, formData).
            then(response => {
                return response.data
            })
    }

}
