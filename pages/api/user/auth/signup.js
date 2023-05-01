import clientPromise from "@/lib/mongodb";

export default  async function handler(req, res) {
    
    
    if(req.method === "POST"){
        try {
            const client = await clientPromise;
          
            
          } catch (error) {
           
            res.status(500).json({ status: "error", message: "Internal Server Error" });
          }
    } else {
        res.status(400).json({ status: "error", message: "Bad request" });
    }  
  }
  