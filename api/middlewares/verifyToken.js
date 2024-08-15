import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next) => {
     const token = req.cookies.token;
     if (!token) return res.ststus(401).json({ message: "not authenticated" });

     jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
       if (err) return res.status(403).json({ message: "token not valid" });

         res.status(201).json({ message: "authenticated user" });
         req.userId=payload.id
         next()
     });
}