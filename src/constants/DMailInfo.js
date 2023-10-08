import { __src } from "../utils/utils.js";



export default {
    welcome: {
        subject: "Welcome to Our E-Commerce",
        attachments: [
            {
                filename: 'banner.png',
                path: `${__src}/public/img/handShake.jpg`,
                cid: 'banner'
            }
        ]
    },
    restore: {
        subject: "Restore you Password",
        attachments: [
            {
                filename: 'banner.png',
                path: `${__src}/public/img/restorePassword.jpg`,
                cid: 'banner'
            }
        ]
    },
    expired: {
        subject: "Your account has expired",
        attachments: [
            {
                filename: 'banner.png',
                path: `${__src}/public/img/deletedProduct640.png`,
                cid: 'banner'
            }
        ]
    },
    deleted: {
        subject: "One of your Product was deleted.",
        attachments: [
            {
                filename: 'banner.png',
                path: `${__src}/public/img/handShake.jpg`,
                cid: 'banner'
            }
        ]
    }
}