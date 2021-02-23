const Const = {
    // ローカル
    local: {
        API_PATH: "/api/v1",
    },
    // 本番
    prod: {
        API_PATH: "https://trahisashi.herokuapp.com/api/v1",
    }
    
}

module.exports = Const['prod'];
