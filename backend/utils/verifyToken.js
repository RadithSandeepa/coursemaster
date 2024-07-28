import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token){
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err)
            return next(createError(401, "Token is not valid!"));

        req.user = user;
        next();
    
    });

};

export const verifyNotAdmin = async(req, res, next) => {
   
    verifyToken(req, res, () => {
        if(req.user.role === "S" || req.user.role === "F"){
            next();
        } else{
            return next(createError(403, "Only students or Faculty can perform this action."));
        }
    });
}

export const verifyOnlyStudent = async(req, res, next) => {
   
    verifyToken(req, res, () => {
        if(req.user.role === "S"){
            next();
        } else{
            return next(createError(403, "Only students can perform this action."));
        }
    });
}

export const verifyOnlyUserStudent = async(req, res, next) => {
   
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id && req.user.role === "S"){
            next();
        } else{
            return next(createError(403, "Only authorized students can perform this action."));
        }
    });
}

export const verifyOnlyFaculty = async(req, res, next) => {
   
    verifyToken(req, res, () => {
        if(req.user.role === "F"){
            next();
        } else{
            return next(createError(403, "Only faculty members can perform this action."));
        }
    });
}

export const verifyUser = async(req, res, next) => {
   
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.role === "A"){
            next();
        } else{
            return next( createError(403, "You are not authorized!!!"));
        }
    });
}

export const verifyFaculty = async(req, res, next) => {
    
    verifyToken(req, res, () => {
        if(req.user.role === "F" || req.user.role === "A"){
            next();
        } else{
            return next( createError(403, "You are not authorized!!!"));
        }
    });
   
}

export const verifyAdmin = async(req, res, next) => {
   
    verifyToken(req, res, () => {
        if(req.user.role === "A"){
            next();
        }else{
            return next( createError(403, "You are not authorized!!!"));
        }
     }); 
}
