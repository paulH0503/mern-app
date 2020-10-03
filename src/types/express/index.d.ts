
import { IUserId } from "../user";
import { HTTPContext } from "../../middleware/context";

declare module "express-serve-static-core" {
  namespace Express {
    interface Application {
    }
    interface Response {
      ctx: HTTPContext;
    }
    interface Request {
      // current user's id in token header
      userId: IUserId;
    }
  }
}
