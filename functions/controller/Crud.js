const crudData = require('../models/Crud');

exports.createProduct=async(req,res,next)=>{
    const create = new crudData(req.body);

    try {
        const createdData = await create.save();
        res.status(200).json({
            success:true,
            createdData,
            message:'Product Successfully created'
        })
    } catch (err) {
        next(err)
    }
}

// exports.createProduct='/api/create',async(req,res,next)=>{
//     const create = new crudData(req.body);

//     try {
//         const createdData = await create.save();
//         res.status(200).json({
//             success:true,
//             createdData,
//             message:'Product Successfully created'
//         })
        
//     } catch (err) {
//         next(err)
//     }
// }


exports.updateProduct= async(req,res,next)=>{
    try {
        const update = await crudData.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json({
            success:true,
            update,
            message:"Product updated successfully"
        })

    } catch (err) {
        next(err)
    }
}


exports.deleteProduct= async(req,res,next)=>{
    try {
        const deleteProduct = await crudData.findByIdAndDelete(req.params.id);

        if (!deleteProduct) {
            return res.status(402).json({
                success:false,
                message:'Product does not exist anymore'
            })
        }

        res.status(200).json({
            success:true,
            message:"You have Successfull deleted the Product"
        });

    } catch (err) {
        next(err);
    }

}


exports.getOneProduct= async(req,res,next)=>{
    try {
        const getData= await crudData.findById(req.params.id);
        res.status(200).json(getData);
    } catch (err) {
        next(err)               
    }
}


exports.getAllProducts= async(req,res,next)=>{
    try {
        const getAllData = await crudData.find();
        res.status(200).json({
         success:true,
         getAllData   
        })
    } catch (err) {
        next(err)       
    }
}