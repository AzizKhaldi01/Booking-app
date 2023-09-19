const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Favorite = require("./module/Favorite");
const Place = require("./module/place.js");
const jwt = require("jsonwebtoken");
const User = require("./module/User.js");
const Booking = require("./module/Booking.js");

const imageDownloader = require("image-downloader");
const CookieParser = require("cookie-parser");
const stripe = require("stripe")(
  "sk_test_51NhBfRGDCWqRoBjnEZ1rA5HHQXjXoPaPReFb1aDJS2oUgNEvRDw4SEd2Fl4Q9FbCggmri9hK50cHnJl7TwUsncav006aX7hl0e"
);

require("dotenv").config();
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

const cookieParser = require("cookie-parser");
const path = require("path");
const { ArrowForwardIosTwoTone } = require("@mui/icons-material");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.get("/test", (req, res) => {
  res.json("test ok ");
});

mongoose.connect(process.env.MONGO_URL);

const jwtsecret = "azaza65z4a65z4a65z4";

const invalidCharactersRegex = /[-è_çà''"é&²}` {}[\]]/;

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (
    invalidCharactersRegex.test(email) ||
    invalidCharactersRegex.test(password)
  ) {
    return res
      .status(400)
      .json({ message: "Email or password contains invalid characters" });
  }

  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const isMatch = bcrypt.compareSync(password, userDoc.password);
      if (isMatch) {
        const token = jwt.sign(
          { id: userDoc._id, email: userDoc.email },
          "your-secret-key"
        );

        // Set the token as a cookie
        res.cookie("jwtToken", token); // 'jwtToken' is the name of the cookie
        res.json(userDoc);
      } else {
        res.status(422).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to handle incoming requests
app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;

    if (cookies.jwtToken) {
      const token = cookies.jwtToken;

      jwt.verify(token, "your-secret-key", {}, async (err, userdata) => {
        if (err) {
          res.status(401).json({ error: "Invalid or expired JWT token" });
        } else {
          const { firstname  , lastname, email, _id } = await User.findById(userdata.id);
          res.json({firstname , lastname , email, _id });
        }
      });
    } else {
      res.json("");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//
app.post("/Registre", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the Password field exists
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("jwtToken", "").json(true);
});

app.post("/upload-by-url", async (req, res) => {
  const { link } = req.body;

  try {
    const newname = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newname,
    });

    res.json(newname);
  } catch {
    res.status(400).json("invalud url");
  }
});

const allowedExtensions = [".jpg", ".png"];

const storage = multer.diskStorage({
  destination: (rec, file, cd) => {
    cd(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const originalExtension = path.extname(file.originalname).toLowerCase();
    const desiredExtension = allowedExtensions.includes(originalExtension)
      ? originalExtension
      : ".jpg";
    const newFileName = file.fieldname + "__" + Date.now() + desiredExtension;
    cb(null, newFileName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
});

app.post("/uploads", upload.array("files", 3), (req, res) => {
  const renamedFiles = req.files.map((file) => file.filename);

  // Now you can send the array of renamed filenames back in the response.
  res.json({ filenames: renamedFiles });
});

app.post("/places", (req, res) => {
  const cookies = req.cookies;
  const token = cookies.jwtToken;
  const {
    title,
    address,
    addedPhotos,
    description,
    price,
    category,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  jwt.verify(token, "your-secret-key", {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      price,
      category,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", async (req, res) => {
  const cookies = req.cookies;
  const token = cookies.jwtToken;

  if (cookies.jwtToken) {
    jwt.verify(token, "your-secret-key", {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;
      res.json(await Place.find({ owner: id }));
    });
  } else {
    res.json([]);
  }
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;

  res.json(await Place.findById(id));
});

app.put("/places", (req, res) => {
  const cookies = req.cookies.jwtToken;

  const {
    price,
    category,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    link,
  } = req.body;

  jwt.verify(cookies, "your-secret-key", {}, async (err, userData) => {
    if (err) throw err;

    const placeDoc = await Place.findById(link);

    if (placeDoc.owner.toString() === userData.id) {
      placeDoc.set({
        price,
        category,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      await placeDoc.save();
    }
  });
});

app.get("/places-all", async (req, res) => {
  res.json(await Place.find());
});

app.get("/place-details/:_id", async (req, res) => {
  const { _id } = req.params;

  const place = await Place.findById(_id);
  res.json(place);
});

app.delete("/place-delete/:id", async (req, res) => {
  const { id } = req.params;

  console.log("deleted id  " + id);
  res.json(await Place.findByIdAndDelete(id));
});

app.get("/filter", async (req, res) => {
  const { perks, category, minPrice, maxPrice } = req.query;

  console.log(perks);
  // Build the filter object based on the query parameters
  const filter = {};
  if (perks) {
    filter.perks = { $all: perks };
  }
  if (category) {
    filter.category = { $in: category };
  }
  if (minPrice && maxPrice) {
    filter.price = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice) {
    filter.price = { $gte: minPrice };
  } else if (maxPrice) {
    filter.price = { $lte: maxPrice };
  }

  // Count the total number of filtered items
  const totalItems = await Place.countDocuments(filter);

  // Apply pagination using Mongoose's skip and limit methods

  try {
    const filteredItems = await Place.find(filter);
    res.json({ data: filteredItems, totalItems });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/booking-add", async (req, res) => {
  const { checkInDate, checkOutDate, Guest, daysStayed, _id, price } = req.body;

  console.log(checkInDate, checkOutDate, Guest, daysStayed, _id, price);
});

app.post("/submit-payment", async (req, res) => {
  const { paymentMethodId, placeid, days, checkOut, checkIn } = req.body;
  const { jwtToken } = req.cookies;

  const place = await Place.findById(placeid);

  try {
    const amount = Math.round(
      (place.price * days + (place.price * days) / 12) * 100
    );
    // Create a PaymentIntent using the Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    if (paymentIntent.status === "succeeded") {
      jwt.verify(jwtToken, "your-secret-key", async (err, userData) => {
        if (err) throw err;
        const { id } = userData;

        const bookingData = {
          Place: placeid,
          User: id,
          days: days,
          checkIn: checkIn, // Replace with the actual check-in date
          checkOut: checkOut, // Replace with the actual check-out date
          name: "Aziz", // Replace with the actual name
          phone: "+21307789523", // Replace with the actual phone number
          price: amount,
        };
        Booking.create(bookingData);
      });
    }

    // Handle success and send response
    res.status(200).json({ message: "Payment successful." });
    //
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred." });
  }
});

app.get("/get-bookings", async (req, res) => {
  const { jwtToken } = req.cookies;

  if (jwtToken) {
    jwt.verify(jwtToken, "your-secret-key", {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;

      const bookings = await Booking.find({ User: id }).populate("Place");

      res.json(bookings);
    });
  } else {
    res.json([]);
  }
});

app.get("/get-bookingDetails/:id", async (req, res) => {
  const { id } = req.params;

  const bookingdetails = await Booking.findById(id).populate("Place");

  res.json(bookingdetails);
});

app.post("/add-favorite", async (req, res) => {
  const { jwtToken } = req.cookies;

  if (jwtToken) {
    jwt.verify(jwtToken, "your-secret-key", {}, async (err, userData) => {
      if (err) throw err;
      const { placeID } = req.body;
      const { id } = userData;

      const favoriteId = await Favorite.findOne({ Place: placeID });
      console.log(favoriteId?.Place == placeID);
      if (favoriteId?.Place == placeID) {
        console.log(favoriteId);
        await Favorite.findOneAndDelete({ Place: placeID });
        res.json("unliked");
      } else {
        const favoriteData = {
          Place: placeID,
          User: id,
        };
        Favorite.create(favoriteData);
        res.json("liked");
      }
    });
  } else {
    res.json("");
  }
});

app.get("/get-favorite", async (req, res) => {
  const { jwtToken } = req.cookies;

  if (jwtToken) {
    jwt.verify(jwtToken, "your-secret-key", {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;

      res.json(await Favorite.find({ User: id }).populate("Place"));
    });
  } else {
    res.json([]);
  }
});

app.get("/get-favorite-placeID", async (req, res) => {
  const { jwtToken } = req.cookies;

  if (jwtToken) {
    jwt.verify(jwtToken, "your-secret-key", {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;

      res.json(await Favorite.find({ User: id }));
    });
  } else {
    res.json([]);
  }
});

app.get("/booking-check/:_id", async (req, res) => {
  const { jwtToken } = req.cookies;
  if (jwtToken) {
    jwt.verify(jwtToken, "your-secret-key", {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;
      const { _id } = req.params;

      const bookings = await Booking.find({ User: id, Place: _id }).exec();

      console.log(bookings);

      if (bookings.length > 0) {
        res.json("booked");
      } else {
        res.json("not booked");
      }
    });
  } else {
    res.json([]);
  }
});

app.post("/updateprofile", async (req, res) => {
  const { FirstName, LastName, Email } = req.body;
  console.log(FirstName, LastName, Email);

  const { jwtToken } = req.cookies;

  jwt.verify(jwtToken, "your-secret-key", {}, async (err, userData) => {
    if (err) throw err;
    const {id} = userData;
    if (Email && FirstName && LastName) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
       
      if (emailPattern.test(Email)       ) {

        const maxLength = FirstName.length <= 35 && LastName.length <= 35 && Email.length <= 40  ; 

 console.log(maxLength)

if( maxLength){


        const UserDoc = await User.findById(userData.id);
        
 

        const emailExist = await User.findOne({ email: Email});
 
        if ( emailExist == null || Email  == UserDoc.email    ) {
         

          UserDoc.set({
            email:Email,
            firstname:FirstName,
            lastname:LastName,
          });
          await UserDoc.save(); 
          res.status(200).json({ message: "saved" });
        } else {
          res.json({ message: "emailexist" });
        }
     }else{
      res.json({ message: "maxChar" });
     }
     
     
      } else {
        res.json({ message: "Invalid email format" });
      }
    } else {
      res.status(400).json({ message: "Missing required properties" });
    }
  });
});

app.listen(4000, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${4000}`);
});
