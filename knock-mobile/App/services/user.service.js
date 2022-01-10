import HttpClient from './http-client'

export const UserService = (function() {
    
    const getUser = async () => (
        await HttpClient.get('/users/me')
    )

    const updateProfile = async data => (
        await HttpClient.put('/users/me', data)
    )

    const login = async (email, password) => {
        return await HttpClient.post("/auth/login", {
          email,
          password,
        });
    };
    
    const signup = async (body) => {    
        return await HttpClient.post("/auth/signup", body);
    };

    return {
        getUser,
        updateProfile,
        login, 
        signup
    }
})()
