import Pincodes from "../../pincodes.json";
export default function handler(req, res) {
  const pincodes = Pincodes;
  if (pincodes.includes(parseInt(req.body.pincode))) {
    res.status(200).json({ status: true, message: "available" });
  } else {
    res
    .status(200)
    .json({ status: false, message: "No dealer ships to this pincode" });
  }
}
