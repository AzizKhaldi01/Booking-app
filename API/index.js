 const express = require('express');
 const cors = require('cors');
 const multer = require('multer')
 
const Place = require('./module/place.js')
 const jwt = require('jsonwebtoken')
 const User = require('./module/User.js');
 const imageDownloader = require('image-downloader')
 const CookieParser = require('cookie-parser')
 

 require('dotenv').config()
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');

const cookieParser = require('cookie-parser');
const path = require('path');



  const app = express();
  app.use(cookieParser())
  app.use(express.json())
   app.use('/uploads' , express.static(__dirname+'/uploads'))
  app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
  })) 
 app.get('/test', (req,res)=> 
 {
    res.json('test ok ')
 }

 );
 
 mongoose.connect( process.env.MONGO_URL);


 const jwtsecret = 'azaza65z4a65z4a65z4';

 const invalidCharactersRegex = /[-è_çà''"é&²}` {}[\]]/;
 
 app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (invalidCharactersRegex.test(email) || invalidCharactersRegex.test(password)) {
    return res.status(400).json({ message: 'Email or password contains invalid characters' });
  }

  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const isMatch = bcrypt.compareSync(password, userDoc.password);
      if (isMatch) {
        const token = jwt.sign({ id: userDoc._id ,  email:userDoc.email}, 'your-secret-key' );

        // Set the token as a cookie
        res.cookie('jwtToken', token,  )  // 'jwtToken' is the name of the cookie
         res.json(userDoc);
      } else {
        res.status(422).json({ message: 'Invalid password' });
      }
    } else {
      res.status(404).json({ message: 'Email not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to handle incoming requests
app.get('/profile', (req, res) => {
  // Access all the cookies from the request object
 

  const cookies = req.cookies;
 

  if (cookies && cookies.jwtToken  ) {
    const token = cookies.jwtToken;
   

     jwt.verify(token, 'your-secret-key', {}, async (err, userdata) => {
 if (err)  throw err 
const {name , email , _id} = await User.findById(userdata.id)
        res.json({name , email , _id});
      
    });
  } else {
    res.send('No JWT token found in the cookies');
  }
});



 //
 app.post('/Registre', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the Password field exists
    if (!password) {
      return res.status(400).json({ message: 'Password is required.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10); // Using bcrypt with a salt factor of 10

    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
  
});


app.post('/logout', (req, res) => {
   
  res.cookie('jwtToken', '').json(true);
 
  
   
});

 
app.post('/upload-by-url', async (req, res) => {
   
   const  {link} = req.body
    
   try{
    
     const newname = 'photo' + Date.now() +   '.jpg'
  await  imageDownloader.image({
    url:link,
    dest:__dirname +'/uploads/'+newname
   })
 
   res.json(newname)
 
 
   }catch{
    res.status(400).json('invalud url')
   }
 

 

   
});

const allowedExtensions = ['.jpg', '.png'];
 
const storage = multer.diskStorage({
  destination:(rec , file , cd)=>{
      cd(null , 'uploads/')
  },
  filename: function (req, file, cb) {
    const originalExtension = path.extname(file.originalname).toLowerCase();
    const desiredExtension = allowedExtensions.includes(originalExtension) ? originalExtension : '.jpg';
    const newFileName = file.fieldname + '__' + Date.now() + desiredExtension;
    cb(null, newFileName);
  }
})

const upload = multer({
  storage:storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
})

app.post('/uploads', upload.array('files', 3), (req, res) => {

   
  const renamedFiles = req.files.map(file => file.filename);
 

  // Now you can send the array of renamed filenames back in the response.
  res.json({ filenames: renamedFiles });
});



app.post('/places', (req,res) => {
  const cookies = req.cookies;
  const token = cookies.jwtToken;
  const { 
    title,address,addedPhotos,description,price,
    perks,extraInfo,checkIn,checkOut,maxGuests,
  } = req.body;
  jwt.verify(token, 'your-secret-key', {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner:userData.id,price,
      title,address,photos:addedPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,
    });
    res.json(placeDoc);
  });
});

app.get('/user-places', async (req,res) => {
    const cookies = req.cookies;
  const token = cookies.jwtToken;
   jwt.verify(token, 'your-secret-key', {}, async (err, userData) => {
    if (err) throw err;
    const {id} = userData
  res.json( await Place.find({owner:id}) );
   
  
});
});

 
app.get( '/places/:id' , async (req , res)=>{
  const {id} = req.params

  res.json(await Place.findById(id))
 
}  );

app.put( '/places' ,   ( req , res)=>{
  const cookies = req.cookies.jwtToken;

  const   {  price,  
    title,address, addedPhotos,description,
    perks,extraInfo,checkIn,checkOut,maxGuests,link } = req.body
 
 console.log(title,address,   addedPhotos, description,
  perks,extraInfo,checkIn,checkOut,maxGuests,link)




  jwt.verify(cookies , 'your-secret-key'  , {},async (err, userData) => {
   
if (err) throw err 

     const placeDoc = await  Place.findById(link)


     if( placeDoc.owner.toString()  === userData.id ){
       placeDoc.set({price,
    title,address,photos:addedPhotos,description,
    perks,extraInfo,checkIn,checkOut,maxGuests,
       })
     await  placeDoc.save() 
     
     }
  
    });
     

    app.get('/places ' , (req , res) =>{

    } );
 
  } ) 



   
 
   
 app.listen(4000, () => {
   console.log(`Server is running on http://localhost:4000`);
 });