// const JWT = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//   try {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//       return res.status(401).send({
//         success: false,
//         message: "Authorization header is missing",
//       });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//       return res.status(401).send({
//         success: false,
//         message: "Token is missing",
//       });
//     }

//     JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).send({
//           success: false,
//           message: "Invalid token",
//         });
//       } else {
//         req.userId = decoded;
//         next();
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(401).send({
//       success: false,
//       error,
//       message: "Auth Failed",
//     });
//   }
// };

const JWT = require("jsonwebtoken")
const userModel = require("../models/userModel")

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header is missing",
      })
    }

    const token = authHeader.split(" ")[1]
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token is missing",
      })
    }

    JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Invalid token",
        })
      } else {
        const user = await userModel.findById(decoded.userId)
        if (!user) {
          return res.status(401).send({
            success: false,
            message: "User not found",
          })
        }
        req.user = user
        next()
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      success: false,
      error,
      message: "Auth Failed",
    })
  }
}

