import Client from "../../../models/Client";
import dbConnect from "../../../services/dbConnect";

dbConnect();

export default async function handler(req, res){
    const {method} =req;
    const {ClientID} = req.query;

    switch (method){
        case "PUT":
            try{
                const {ID,firstname,lastname,email,phone,address} = req.body;
                if((!ID,!firstname,!lastname,!email,!phone,!address)) throw "invalid";
                await Client.updateOne({_id:ClientID}, {ID,firstname,lastname,email,phone,address})
                res.status(200).json({ sucess:true});
            }catch (error){
                console.log(error);
                res.status(500).json({sucess:false, error});
            }
            break;

            case "DELETE":
                try{
                    await Client.deleteOne({_id: ClientID});
                    res.status(200).json({sucess:true});
                }catch(error){
                    console.log(error);
                    res.status(500).json({sucess:false,error});
                }
                break;
    }
}