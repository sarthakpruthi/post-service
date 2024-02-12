const zod = require("zod");

function schemaCheck(req,res,next){
    let body = req.body;
    let schema = zod.object({
        userId : zod.string(),
        postImageUrl : zod.string().url(),
        caption : zod.string(),
        likes : zod.number(),
        comments : zod.array(),
        taggedPeopleId : zod.array(zod.string()),
    });
    try{
        schema.parse(body);
        next();
    }
    catch(e){
        res.send(e);
    }

}

module.exports = {
    schemaCheck
};