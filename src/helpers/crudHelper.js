exports.create = async (model, data) => {
    return await model.create(data)
}

exports.find = async (model) => {
    return await model.find({})
}

exports.findById = async (model, query) => {
    return await model.find(query)
}

exports.update = async (model, query, data) => {
    return await model.findOneAndUpdate(query, data);
}

exports.delete = async (model, query) => {
    return await model.deleteOne(query);
}





