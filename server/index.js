const db = require("./queries");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir("./uploads/", (err) => {
      cb(null, "./uploads/");
    });
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Appending extension
  },
});

// Set up the Multer middleware with file size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

// Serve uploaded images statically
app.use("/images", express.static(path.join(__dirname, "uploads")));

// COMMON APIS
app.post("/signup", db.signup);
app.post("/login", db.login);
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  const baseURL = `${req.protocol}://${req.get("host")}`;
  const imagePath = baseURL + "/images/" + req.file.filename;
  res
    .status(200)
    .json({ message: "Image uploaded successfully", image_url: imagePath });
});

//ADMIN APIS
app.post("/admin/add-menu", db.addMenu);
app.get("/admin/orders", db.getOrders);

// EMPLOYEE APIS
app.post("/employee/add-order", db.addOrder);
app.get("/employee/menus", db.getMenus);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
