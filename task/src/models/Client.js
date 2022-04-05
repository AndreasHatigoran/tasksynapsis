const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
        ID: String,
            
        firstname: String,
            
        lastname: String,
            
        email: String,
            
        phone: Number,
            
        address:String,
            
    
})
const Client = mongoose.models.Client || mongoose.model("Client", ClientSchema);

export default Client;