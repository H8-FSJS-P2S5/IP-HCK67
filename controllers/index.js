class Controller {

    static getHello (req,res) {
        //console.log(req.user, "ini req user")
        res.json({message: 'Hello World JSON from Controller!'})
        res.send()
    }


    // static async getAllArticles (req,res,next) {
    //     try {
    //         console.log(req.user, ">>> req.user")
    //         const articles = await Article.findAll({
    //             // where:{
    //             //     name:"TEST"
    //             // }
    //         })
    //         res.status(200).json({message: "Success!", data:articles})
    //     } catch (error) {
    //         next(error)
    //         // console.log(error)
    //         // res.status(500).json({message:"Internal Server Error"})
    //     }
    // }

}





module.exports = Controller