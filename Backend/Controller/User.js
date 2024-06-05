import { User } from "../Model/User.js";
import jwt from "jsonwebtoken";
// import { sendMail } from "../middlewares/sendMail.js";
import cloudinary from "cloudinary";


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged In Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne().select("-password -email");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, password, about } = req.body;

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    if (about) {
      user.about = about;
    }


    await user.save();

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};







export const addProject = async (req, res) => {
  try {
    const { title, subtitle, viewUrl, sourceCode, techUsed } = req.body;
    const user = await User.findById(req.user._id);

    const newProject = {
      title,
      subtitle,
      viewUrl,
      sourceCode,
      techUsed: [],
    };

    // Iterate over the techUsed array and upload captures
    for (const tech of techUsed) {
      const { title, captures } = tech;
      const myCloud = await cloudinary.v2.uploader.upload(captures, {
        folder: "portfolio",
      });

      newProject.techUsed.push({
        title,
        captures: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });
    }

    user.projects.unshift(newProject);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Added To Projects",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};




export const addSkills = async (req, res) => {
  try {
    const { title, subtitle, pictographs, tech } = req.body; // Destructure skill details from request body
    const user = await User.findById(req.user._id); // Find the user by ID

    // Upload pictograph image to Cloudinary
    const myClouds = await cloudinary.v2.uploader.upload(pictographs.url, {
      folder: "portfolio", // Specify the folder where pictograph will be stored
    });

    const newSkill = {
      title,
      subtitle,
      pictographs: {
        public_id: myClouds.public_id,
        url: myClouds.secure_url,
      },
      tech: [],
    };

    // Iterate over the tech array and upload icons
    for (const techItem of tech) {
      const { title, icons } = techItem;
      const myCloud = await cloudinary.v2.uploader.upload(icons, {
        folder: "portfolio", // Specify the folder where icons will be stored
      });

      newSkill.tech.push({
        title,
        icons: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });
    }

    user.skills.unshift(newSkill); // Add the skill to user's skills array
    await user.save(); // Save the user with the updated skills
    res.status(200).json({
      success: true,
      message: "Skill added successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const addLatestWorks = async (req, res) => {
  try {
    const { graphics } = req.body; // Destructure graphics details from request body
    const user = await User.findById(req.user._id); // Find the user by ID

    // Upload graphics image to Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(graphics.url, {
      folder: "portfolio", // Specify the folder where graphics will be stored
    });

    const newWork = {
      graphics: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };

    user.latestWorks.unshift(newWork); // Add the latest work to user's latestWorks array
    await user.save(); // Save the user with the updated latest works
    res.status(200).json({
      success: true,
      message: "Latest work added successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
