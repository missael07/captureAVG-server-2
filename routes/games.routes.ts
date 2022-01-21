import { Router } from 'express';
import { Games } from '../models/games.model';
import { verifyToken } from '../middlewares/auth';

const gamesRoutes = Router();

gamesRoutes.post('/create',verifyToken, (_req: any, _resp: any) => {
    const { atBat, hits, gameNo } = _req.body;

    const games = {
        atBat,
        hits,
        user: _req.user.id,
        gameNo,
        avg: hits/atBat
    }
    Games.findOne({ gameNo, user: games.user }, (err, gameDB) => {
        if (gameDB) return _resp.json({ ok: false, message: 'Juego ya capturado' });

        Games.create(games).then( async gamesDB => {
            await gamesDB.populate('user', '-password');
            _resp.json({gamesDB})
        }).catch( err => _resp.json({err}))
    });
    
});


gamesRoutes.get('/', async (_req, _resp) => {
    const games = await Games.find().sort({ gameNo: 1 }).populate('user', '-password');
    _resp.json({games})
})

export default gamesRoutes;
