import { NextFunction, Request, Response } from "express"

export type TController = (req: Request, res: Response, next: NextFunction) => Promise<void>
