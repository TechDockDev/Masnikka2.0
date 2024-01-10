import dbConnect from "@/lib/dbConnect";
import getUser from "@/lib/getUser";

export default async function handler(req, res) {
  await dbConnect();
  // if (req.method == "OPTIONS") {
  //   res.setHeader("Access-Control-Allow-Methods", "GET");
  //   return res.status(202).json({});
  // }
  if (req.method === "GET") {
    console.log(req.headers.id);
    req.user = await getUser(req.headers.id);
    res.json({
      status: "success",
      message: "user is fetched successfully",
      user: req.user,
    });
  }
}
