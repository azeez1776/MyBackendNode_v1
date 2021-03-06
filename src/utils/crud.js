const getOne = model => async (req, res) => {
    try {
        let doc = await model.findOne({ _id: req.params.id })
            .lean()
            .exec()
        res.status(200).json(doc).end()
    } catch (e) {
        console.log(e)
        res.status(401).json({ message: "Failed to retrieve from the Database" }).end()
    }
}

const getAll = model => async (req, res) => {
    try {
        let doc = await model.find({ createdBy: req.user.id })
            .lean()
            .exec()
        res.status(200).json(doc).end()
    } catch (e) {
        console.log(e);
        res.status(401).json({ message: 'Failed to retrieve from the Database' }).end();
    }
}

const create = model => async (req, res) => {

    const { name, notes, due } = req.body;
    try {
        let doc = await model.create({
            name,
            notes,
            due,
            createdBy: req.user.id
        })
        res.status(200).json(doc).end()
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Failed to create, something wrong with the Database' }).end()
    }
}

export const remove = model => async (req, res) => {
    try {
        let doc = await model.findOneAndRemove({ _id: req.params.id })
        res.status(200).json(doc).end()
    } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'Failed to delete, something wrong with the Database' }).end()
    }
}

const update = model => async (req, res) => {
    try {
        const doc = await model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .lean()
            .exec()
        res.status(200).json(doc).end()
    } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'Failed to update, something wrong with the Database' }).end()
    }
}

export const crudController = model => ({
    getOne: getOne(model),
    getAll: getAll(model),
    create: create(model),
    remove: remove(model),
    update: update(model)
})