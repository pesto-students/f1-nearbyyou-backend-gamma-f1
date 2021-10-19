//import Libriry
const express = require('express');
const cors = require("cors");
const path = require('path');
const connectDB = require('./config/db');
connectDB();

const task = require('./middleware/cornJob/ticketCorn')
 




//Create Object
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//Define routes 
app.use('/api/user', require('./Router/index'))
app.use('/api/customer', require('./Router/customer.routes'));
app.use('/api/admin', require('./Router/admin.routes'));
app.use("/api/vendor", require('./Router/vendor.routes'));
app.use("/api/ticket", require('./Router/ticket.router'));



const PORT = process.env.PORT || 3003;


// Start the server @ port
app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
});
