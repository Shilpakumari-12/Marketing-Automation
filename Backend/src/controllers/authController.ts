import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authController = {
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  googleLogin: async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, profile } = req.body;
      
      let user = await User.findOne({ googleId: profile.sub });
      
      if (!user) {
        user = await User.create({
          googleId: profile.sub,
          email: profile.email,
          name: profile.name
        });
      }
      
      const jwtToken = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({
        token: jwtToken,
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};