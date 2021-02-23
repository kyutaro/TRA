const Const = {
    // ローカル
    local: {
        mongoDBUrl: "mongodb://localhost:27017/TRA",
        devFlg: true,    
    },
    // 本番
    prod: {
        mongoDBUrl: "mongodb+srv://IronPerson:3GXh3idj@cluster0.kz31u.mongodb.net/TRA?retryWrites=true&w=majority",
        devFlg: true,    
    }
}

module.exports = Const['prod'];