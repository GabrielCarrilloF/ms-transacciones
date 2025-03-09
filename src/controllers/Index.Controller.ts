import { Request, Response, NextFunction } from 'express';

export function IndexWelcome(_req: Request, res: Response, next: NextFunction): void {
   try {
       res.json({
            satatus: 200,  
            message: 'Welcome to the API' 
        });
   } catch (error) {
       next(error);
   }
}