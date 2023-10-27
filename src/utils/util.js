const getDefaultDataWhenCreate = request => {
    const createdBy = request?.user._id ?? null;

    return { createdBy, createdAt: new Date(), updatedAt: new Date() }
}

const getDefaultDataWhenUpdate  = request => {
    const updatedBy = request?.user._id ?? null;

    return { updatedBy, updatedAt: new Date() }
}

const getDefaultDataWhenDelete  = request => {
    const deletedBy = request?.user._id ?? null;

    return { deletedBy, deletedAt: new Date() }
}



module.exports = {
    getDefaultDataWhenCreate,
    getDefaultDataWhenUpdate,
    getDefaultDataWhenDelete
}
