import JWT from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // Get token
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: "Unauthorize user" });
      } else {
        req.user = { id: decode.id };
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Please Provide Auth Token",
      error,
    });
  }
};

export default authMiddleware;
