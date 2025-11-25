const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const ViewsController = require('./src/Routes/views.routes');
const ProceduresController = require('./src/Routes/procedures.routes');

// Enable CORS
app.use(cors({
  origin: '*',  // or set to your frontend: 'http://localhost:5173'
}));

app.use(express.json());

// Routes
app.use('/views', ViewsController);
app.use('/procedures', ProceduresController);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
