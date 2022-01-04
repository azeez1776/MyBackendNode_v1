export const getOne = model => async (req, res) => {
    try{
        let doc = await model.findOne({_id:req.params.id})
            .lean()
            .exec()
        res.status(200).json(doc).end()
    } catch(e){
        console.log(e)
        res.status(401).json({message:"Failed to retrieve from the Database"}).end()
    }
}

export const getAll = model => async (req, res) => {
    try{
        let doc = await model.find({})
            .lean()
            .exec()
        res.status(200).json(doc).end()
    } catch(e){
        console.log(e);
        res.status(401).json({message: 'Failed to retrieve from the Database'}).end();
    }
}

export const crudController = model => ({
    getOne:getOne(model),
    getAll:getAll(model)
})