module.exports = async (ctx, next) => {
    const action = ctx.query.action;
    switch (action) {
        case 'login':
            ctx.body = 'login';
            doLogin()
            break;

        case 'sync':
            ctx.body = 'sync';
            break;

        case 'donate':
            ctx.body = 'donate';
            break;

        default:

            break;
    }
    await next();
}

async function doLogin(ctx){
    return ctx;
}