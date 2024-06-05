import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    select: false,
  },
  about: {
    type: String,
    unique: true,
  },



skills:[
    {
    title:String,
    subtitle:String,
    pictographs:{
        public_id: String,
        url: String,
    },
    tech:[{
        title:String,
        icons:{
            public_id: String,
            url: String,
        }

    }]
}
],

projects:[{
    title:String,
    subtitle:String,
    viewUrl:String,
    sourceCode:String,
    techUsed:[{
        title:String,
        captures:{
            public_id: String,
            url: String,
        }

    }]
}],

latestWorks:[
    {
      graphics:{
        public_id: String,
        url: String,
      }
    }
],
});

export const User = mongoose.model("User", userSchema);