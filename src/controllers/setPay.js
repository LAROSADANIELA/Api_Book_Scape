const {Pay} = require("../db")


const setPay = async(req,res,next)=>{
    try{
    
        const {orden} = req.body

        if(!orden||!req.body.id) return res.staus(400).json({message: "Faltan datos para registrar el pago"})
    
        const userId = req.body.id

        const setPay = await Pay.create(
            {
            id_pay: orden.id,
            order_date: orden.create_time,
            total_order: orden.purchase_units[0].amount.value,
            payment_status: orden.status,
            update_time: orden.status === "COMPLETED" ? orden.update_time:null,
            UserId: userId
        }   
        )

        res.send({message:"Pay registered successfully",registeredPay: setPay})

    }catch(error){
        next(error)
    }
    
}

module.exports=setPay