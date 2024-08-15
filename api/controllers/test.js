import jwt from "jsonwebtoken"

export const shouldBeLoggedIn = async(req,res) => {
    const token = req.cookies.token
    if (!token) return res.ststus(401).json({ message:"unsuthorized user"})
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, async(err,payload) => {
        if (err) return res.status(403).json({ message: "token not valid" })
        
        res.status(201).json({message:"suthorized user"})
    })
}
export const shouldBeAdmin = () => {
        const token = req.cookies.token;
        if (!token)
          return res.ststus(401).json({ message: "unsuthorized user" });

        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
          if (err) return res.status(403).json({ message: "token not valid" });
            if (!payload.isSdmin) return res.status(401).json({message: "unauthorized"})
          res.status(201).json({ message: "suthorized user" });
        });
}