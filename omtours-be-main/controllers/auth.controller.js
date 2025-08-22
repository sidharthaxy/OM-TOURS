import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { google } from 'googleapis';
import { encrypt, decrypt } from '../utils/encryption.js';
import axios from "axios";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Use OAuth2 for token exchange
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI //  your deployed frontend
);

export async function login(req, res) {
  try {
    const { code } = req.body; // Frontend sends auth code from Google

    if (!code) {
      return res.status(400).json({ success: false, message: "Missing authorization code" });
    }

    // Step 1: Exchange auth code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    const { id_token, access_token, refresh_token } = tokens;

    if (!id_token) {
      return res.status(400).json({ success: false, message: "Invalid ID token" });
    }
//console.log("Received tokens:", tokens);
    // Step 2: Verify the ID token to get user info
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      const username = name.toLowerCase().replace(/\s+/g, "") + Math.floor(Math.random() * 1000);
      user = new User({ email, username, image: picture });
    }

    // Step 3: Save encrypted refresh token if new
    if (refresh_token) {
		const currentDecrypted = user.refreshToken ? decrypt(user.refreshToken) : null;
		if (refresh_token !== currentDecrypted) {
			user.refreshToken = encrypt(refresh_token);
		}
	}

    await user.save();

    // Step 4: Issue your app’s JWT cookie
    generateTokenAndSetCookie(user._id, res);

    // ✅ Return only access token (if you want to use it immediately for Google Calendar calls)
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        image: user.image,
      },
      access_token, // Only if you want frontend to call Google Calendar directly — else omit this
    });

  } catch (error) {
    console.error("Google Login Error:", error.message);
    res.status(500).json({ success: false, message: "Google login failed" });
  }
}

export async function createEvent(req, res) {
  try {
    const { summary, description, location, start, end, timeZone } = req.body;

    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const decryptedRefresh = decrypt(user.refreshToken);

    oauth2Client.setCredentials({ refresh_token: decryptedRefresh });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = {
      summary,
      description,
      location,
      start: {
        dateTime: new Date(start).toISOString(),
        timeZone: timeZone || 'Asia/Kolkata',
      },
      end: {
        dateTime: new Date(end).toISOString(),
        timeZone: timeZone || 'Asia/Kolkata',
      },
    };

    const result = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    res.status(200).json({
      message: '✅ Event created successfully',
      eventId: result.data.id,
      htmlLink: result.data.htmlLink,
    });

  } catch (error) {
    console.error("❌ Event creation failed:", error.message);
    res.status(500).json({ message: "Failed to create event" });
  }
}

export async function logout(req, res) {
	try {
		res.clearCookie("omtours-jwt");
		res.status(200).json({ success: true, message: "Logged out successfully" });
	} catch (error) {
		console.log("Logout Error:", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

export async function authCheck(req, res) {
	try {
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("AuthCheck Error:", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}
