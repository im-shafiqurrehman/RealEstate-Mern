import User from "../models/user.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";


export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try{
        await newUser.save()
    res.status(201).json("User created successfully...");
    }catch(error){
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;// pass = validUser._doc.password      //validUser._doc = MongoDB ka raw object hai which contains all fields
     // remaining field ko ak object ma dal do aur usko rest naam dy do
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };

  export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      } else {
        // 36 gives you all digits and letters (0-9, a-z).    base-36  
        // Math.random().toString(36)
        // Math.random() generates a decimal between 0 and 1, like 0.123456789.    
        // .toString(36) converts that decimal to a base-36 string like:   0.123456789 -> "0.pxsnv9f" 
        //slice(-8) means “take the last 8 characters, Negative indices can be used to slice from the end:   
        const generatedPassword =
          Math.random().toString(36).slice(-8) +      
          Math.random().toString(36).slice(-8); 

//    bcryptjs is a popular library in Node.js for hashing passwords securely.
// .hashSync() is the synchronous version of the hashing function (meaning it blocks the thread until finished).
// There’s also an asynchronous version called .hash() that uses callbacks or promises.
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);   // 10 = means how many times apply the hashing algorithm
        const newUser = new User({
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-4),
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
    //👉  password property ko pass variable me daal do.
  // 👉 Baaki saari properties ko ek new object me daal do aur uska naam rest rakh do.
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };

  export const signOut = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  };