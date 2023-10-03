import { __src } from "../utils/utils.js";



export default {
    welcome: {
        subject: "Bienvenido!",
        attachments: [
            {
                filename: 'banner.png',
                path: `${__src}/public/img/handShake.jpg`,
                cid: 'banner'
            }
        ]
    },
    restore: {
        subject: "Restaurar Contraseña",
        attachments: [
            {
                filename: 'banner.png',
                path: `${__src}/public/img/handShake.jpg`,
                cid: 'banner'
            }
        ]
    },
    restore: {
        subject: "Your account has expired",
        attachments: [
            {
                filename: 'banner.png',
                path: `${__src}/public/img/handShake.jpg`,
                cid: 'banner'
            }
        ]
    }
}