import { asyncHandler } from "../utlis/asyncHandler.js"
import { ApiError } from "../utlis/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utlis/cloudinary.js"
import { ApiResponse } from "../utlis/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    // get user details form frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - ccreate entry in db
    // remove password and refresh token field from response
    // check for user creation 
    // return response

    // 1. get user details form frontend
    const { fullName, email, username, password } = req.body
    /* if (fullName === "") {
        throw new ApiError(400, "fullname is required")
    } */ // use to check fullName field is empty or not but we have to check all the field like fullName, email, username, password so we are using another method using .some() in below code

    // 2. validation - not empty
    if (
        [fullName, email, password, username].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // 3. check if user already exists: username, email
    const existedUser = User.findOne({
        $or: [{ username }, { email }] // using $or keyword to access the data of username and email
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    // 4. check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    // 5. upload them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    // 6. create user object - ccreate entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        email,
        password,
        username: username.toLowerCase()
    })

    // 7. remove password and refresh token field from response
   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

    // 8. check for user creation 
   if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
   }

    // 9. return response
   return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
   )
})

export { registerUser }