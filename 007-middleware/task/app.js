const express = require('express')
const indexRouter = require('./routes/index')
const downloadRouter = require('./routes/download')

const app = express();
app.use(express.json());

app.use('/download', downloadRouter);
app.use('/api', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "localhost", (err) => {
    err
      ? console.log(err)
      : console.log(`Server is listening on http://localhost:${PORT}`);
})
