import Server from './classes/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import cors from 'cors';

//Routes Imports
import userRoutes from './routes/user.routes';
import gamesRoutes from './routes/games.routes';
import atBatHitsRoutes from './routes/atBatHits.routes';

const server = new Server();

//Body Parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//Cors
server.app.use(cors({ origin: true, credentials: true }))


//Routes 
server.app.use('/user', userRoutes)
server.app.use('/games', gamesRoutes)
server.app.use('/hits', atBatHitsRoutes)


//Data Base
mongoose.connect('mongodb+srv://missael:admin1234@cluster0.htccc.mongodb.net/captureAVG?retryWrites=true&w=majority', (err) => {
    if (err) throw err;

    console.log('Data Base connected');
    
});

//start express
server.start(() => {
    console.log(`server running in port ${server.port}`);
    
})

