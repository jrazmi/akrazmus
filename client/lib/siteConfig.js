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
            profile: '/profile'
        },
        admin: {
            index: '/admin'
        }
    }
}