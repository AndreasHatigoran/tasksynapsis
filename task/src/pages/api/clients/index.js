import Client from "../../../models/Client";
import dbConnect from "../../../services/dbConnect";

dbConnect();

export default async function handler(req, res){
    const {method} =req;

    switch (method){
        case "GET":
            try{
                const clients = await Client.find({});
                res.status(200).json({ sucess:true, data:clients});
            }catch (error){
                console.log(error);
                res.status(500).json({sucess:false, error});
            }
            break;

            case "POST":
                try{
                    const {ID,firstname,lastname,email,phone,address} = req.body;
                    if((!ID,!firstname,!lastname,!email,!phone,!address)) throw "invalid";
                    const client = await Client.create({ID,firstname,lastname,email,phone,address});
                    res.status(201).json({sucess:true,data:client});
                }catch(error){
                    console.log(error);
                    res.status(500).json({sucess:false,error});
                }
                break;
    }
}