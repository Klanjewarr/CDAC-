import mongoose,{Document, Schema} from "mongoose";

//typescript interface
export interface ICompany extends Document{
    name:string;
    description: string;
    location:string;
    website?:string;
    logo:string;
    employerId: mongoose.Types.ObjectId;
    createdAt:Date;
    updatedAt:Date;
    
}

const companySchema = new Schema<ICompany>(
    {
        name:{
            type:String,
            required:[true,"Name is required"],
            trim: true,
        },
        description: {
      type: String,
      required: [true, "Company description is required"],
    },
    location: {
      type: String,
      required: [true, "Company location is required"],
    },
    website: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default: "",
    },
    employerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
    {
        timestamps:true,
    }
)


export const Company = mongoose.model<ICompany>("Company", companySchema)