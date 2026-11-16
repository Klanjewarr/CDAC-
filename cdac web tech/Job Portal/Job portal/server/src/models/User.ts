import mongoose,{Document, Schema} from "mongoose";
import bcrypt from "bcryptjs";

//typescript interface
export interface IUser extends Document{
    name:string;
    email: string;
    password:string;
    role: "admin"|"employer"|"jobseeker";
    phone?:string;
    isActive:boolean;
    createdAt:Date;
    updatedAt:Date;
    comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        name:{
            type:String,
            required:[true,"Name is required"],
            trim: true,
        },
        email:{
            type: String,
            required:[true,"Email is required"],
            unique: true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:[true, "Password is required"],
            minlength:[6,"Password must be at least 6 characters"]
        },
        role:{
            type:String,
            enum:["admin", "employer", "jobseeker"],
            default:"jobseeker",
        },
        phone:{
            type:String,
            default:"",
        },
        isActive:{
            type:Boolean,
            default:true,
        },
    },
    {
        timestamps:true,
    }
)
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return; //newer mongoose version not need next 
    }
    //generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash (this.password, salt);
    

})

userSchema.methods.comparePassword = async function (enteredPassword: string):
Promise<boolean>{
    return await bcrypt.compare(enteredPassword, this.password)
}

export const User = mongoose.model<IUser>("User", userSchema)