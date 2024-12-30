// types.d.ts (or inside your existing TypeScript declarations)
import { IUser } from '../models/userModel'; // Adjust this import

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // The 'user' property should be of type IUser (user data attached from JWT)
    }
  }
}
