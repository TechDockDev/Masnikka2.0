import dbConnect from "@/lib/dbConnect";
import getUser from "@/lib/getUser";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    req.user = await getUser(req.headers.id);
    if (!req.user) {
      res.status(401).json({
        status: "error",
        message: "User doesn't exist",
      });
    }
    res.json({
      status: "success",
      message: "user is fetched successfully",
      user: req.user,
    });
  }
}
