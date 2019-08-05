export const Site = {
    meta: {
        title: "Jrazmi"
    },
    routes: {
        auth: {
            login: '/login',
            resetRequest: '/request-reset',
            resetPassword: '/reset-password',
            register: '/register',
            logout: '/logout',
        },
        account: {
            settings: '/me'
        },
        admin: {
            index: '/admin',
            users: {
                index: '/admin/users',
                create: '/admin/users/create',
                detail: '/admin/users/detail'
            }
        }
    }
}