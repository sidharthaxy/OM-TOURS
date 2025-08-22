import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String,
		default: "",
	},
	searchHistory: {
		type: Array,
		default: [],
	},
	refreshToken: {
		type: String,
	},
	
});

export const User = mongoose.model("User", userSchema);
