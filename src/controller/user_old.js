/**
 * File: user_old.js
 * Author: muxiaozi <1002042998@qq.com>
 * DateTime: 2018-08-11
 */

const UserService = require('../service/user.service');

module.exports = async (ctx, next) => {
    if(!ctx.query.open_id) {
        ctx.body = 'no valid open_id';
    }else{
        const action = ctx.query.action;
        switch (action) {
            case 'login':
                doLogin(ctx);
                break;
    
            case 'sync':
                doSync(ctx);
                break;
    
            case 'donate':
                doDonate(ctx);
                break;
    
            default:
                ctx.body = 'not valid action';
                break;
        }
    }
    await next();
}

async function doLogin(ctx){
    let { open_id, nick_name, figureurl, gender } = ctx.query;
    
    await UserService.
    UserService.add({
        qq_id: open_id,
        name: nick_name,
        avatar_url: figureurl,
        gender
    })
    return ctx;
}