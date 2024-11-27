import { NextFunction, Request,Response } from "express"

export const sessionMiddleware = (req:Request, _:Response, next:NextFunction) =>{

    if (req.session!.user) {
        console.log(req.session!.user)
       return next()
    } 
    throw new Error('Session does not exist')
}