import {useState, useEffect} from "react";
import {Box, Button, Flex, FormControl, FormLabel, Table, VStack, Input, Thead, Tr,Th, Tbody, Td, useToast} from "@chakra-ui/react";
import Header from "../componets/Header";
import api from "../services/api";

export default function Home() {
  const [ID, setID] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState(null);
  const [clients, setClients] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const toast = useToast();

  useEffect(()=>{
    api.get("/clients").then(({data})=>{
      setClients(data.data);
    });
  },[clients]);

  const isValidFormData = () => {
    if(!ID){
      return toast({
        title:"Masukan ID",
        status:"error",
        duration:9000,
        isClosable:true,
      });
    }

    if(!firstname){
      return toast({
        title:"Masukan firstname",
        status:"error",
        duration:9000,
        isClosable:true,
      });
    }

    if(!lastname){
      return toast({
        title:"Masukan lastname",
        status:"error",
        duration:9000,
        isClosable:true,
      });
    }

    if(!email){
      return toast({
        title:"Masukan email",
        status:"error",
        duration:9000,
        isClosable:true,
      });
    }

    if(!phone){
      return toast({
        title:"Masukan nomor handphone",
        status:"error",
        duration:9000,
        isClosable:true,
      });
    }

    if(!address){
      return toast({
        title:"Masukan alamat",
        status:"error",
        duration:9000,
        isClosable:true,
      });
    }
      if (clients.some((client)=> client.email == email && client._id != id)){
        return toast({
          title:"Email telah didaftarkan",
          status:"error",
          duration:9000,
          isClosable:true,
        });
      }
  };

  const handleSubmitCreateClient = async (e) =>{
    e.preventDefault();

    if(isValidFormData()) return;

    try {
      setIsLoading(true);
      await api.post("/clients", {ID,firstname,lastname,email,phone,address});
      setID("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setIsFormOpen(!isFormOpen)
     toast({
        title:"Berhasil Ditambahkan",
        status:"success",
        duration:9000,
        isClosable:true,
      });
      setIsLoading(false);
    } catch(error){
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async(_id) => {
    try{
      await api.delete(`clients/${_id}`);
      toast({
        title:"Berhasil Dihapus",
        status:"info",
        duration:9000,
        isClosable:true,
      });
    }catch(error){
      console.log(error);
    }
  };

  const handleShowUpdateClient = (client) =>{
    setId(client._id);
    setID(client.ID);
    setFirstName(client.firstname);
    setLastName(client.lastname);
    setEmail(client.email);
    setPhone(client.phone);
    setAddress(client.address);
    setIsFormOpen(true);
  };

  const handleUpdateClient = async(e)=> {
    e.preventDefault();

    if (isValidFormData()) return;
    try{
      setIsLoading(true)
      await api.put(`/clients/${id}`, {ID,firstname,lastname,email,phone,address});
      setID("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setIsFormOpen(!isFormOpen)
     toast({
        title:"Berhasil Diupdate",
        status:"success",
        duration:9000,
        isClosable:true,
      });
      setIsLoading(false);
    }catch (error){}
  };

  return (
    <Box>
        <Header/>
        <Flex align="center" justifyContent="center">
          <Box
          width={1200}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          p={20}
          mt="25"
          >
            <Flex justifyContent="flex-end">
              <Button colorScheme="green" onClick={()=> setIsFormOpen(!isFormOpen)}>{isFormOpen ? "-" : "+"}</Button>
            </Flex>
    {isFormOpen ? (
             <VStack as="form" onSubmit={id ? handleUpdateClient : handleSubmitCreateClient}>
             <FormControl>
               <FormLabel>ID</FormLabel>
               <Input type="text" placeholder="Your ID"
                      value={ID} onChange={(e)=> setID(e.target.value)}
               />
             </FormControl>

             <FormControl>
               <FormLabel>First Name</FormLabel>
               <Input type="text" placeholder="First Name"
                      value={firstname} onChange={(e)=> setFirstName(e.target.value)}
               />
             </FormControl>

             <FormControl>
               <FormLabel>Last Name</FormLabel>
               <Input type="text" placeholder="Last Name"
                      value={lastname} onChange={(e)=> setLastName(e.target.value)}                
               />
             </FormControl>

             <FormControl>
               <FormLabel>Email</FormLabel>
               <Input type="email" placeholder="Email"
                      value={email} onChange={(e)=> setEmail(e.target.value)}                
               />
             </FormControl>

             <FormControl>
               <FormLabel>Phone</FormLabel>
               <Input type="number" placeholder="Phone"
                      value={phone} onChange={(e)=> setPhone(e.target.value)}                
               />
             </FormControl>

             <FormControl>
               <FormLabel>Address</FormLabel>
               <Input type="text" placeholder="Address"
                      value={address} onChange={(e)=> setAddress(e.target.value)}                
               />
             </FormControl>

             <Button colorScheme="green" type="submit" mt={6} isLoading={isLoading}>
               {id ? "Update" : "Daftar"}
             </Button>
           </VStack>
    ):null}

           
            <Table variant="simple" mt={6}>
              <Thead bg="teal.500">
                <Tr>
                  <Th textColor="white">ID</Th>
                  <Th textColor="white">First Name</Th>
                  <Th textColor="white">Last Name</Th>
                  <Th textColor="white">Email</Th>
                  <Th textColor="white">Phone</Th>
                  <Th textColor="white">Address</Th>
                  <Th textColor="white">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {clients.map((client,index)=>(
                    <Tr key={index}>
                    <Td> {client.ID} </Td>
                    <Td>{client.firstname}</Td>
                    <Td>{client.lastname}</Td>
                    <Td>{client.email}</Td>
                    <Td>{client.phone}</Td>
                    <Td>{client.address}</Td>
                    <Td justifyContent="space-between">
                      <Flex>
                        <Button size="sm" fontSize="small" colorScheme="yellow" mr="2"onClick={()=> handleShowUpdateClient(client)}>Edit</Button>
                        <Button size="sm" fontSize="small" colorScheme="red" mr="2" onClick={()=> handleDeleteClient(client._id)}>Delete</Button>
                      </Flex>
                    </Td>
                  </Tr> 
                  ))
                }
                
              </Tbody>
            </Table>
          </Box>
        </Flex>
    </Box>
  );
}
