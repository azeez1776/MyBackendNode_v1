export const getOne = model => async (req, res) => {
    try{
        let doc = await model.findOne({_id:req.params.id})
            .lean()
            .exec()
        res.status(200).end()
    } catch(e){
        console.log(e)
        res.status(401).end()
    }
}

export const getAll = model => async (req, res) => {
    try{
        let doc = await model.find({})
            .lean()
            .exec()
        res.status(200).end()
    } catch(e){
        console.log(e);
        res.status(401).end();
    }
}