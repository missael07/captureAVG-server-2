import bodyParser from 'body-parser';
import { Router } from 'express';
import { verifyToken } from '../middlewares/auth';
import { AtBatHits } from '../models/atBatsHits.model';

const atBatHitsRoutes = Router();

atBatHitsRoutes.post('/create', verifyToken, (_req: any, _resp: any) => {

    const { atBat, hits, game } = _req.body;

    const atBatHits = {
        atBat,
        hits,
        user: _req.user.id,
        game
    }

    AtBatHits.create(atBatHits).then( async atbathitsDB => {

        await atbathitsDB.populate('user', '-password');
        await atbathitsDB.populate('game');
        _resp.json({ ok: true, atbathitsDB})
    }).catch( err => _resp.json({err}))
});

atBatHitsRoutes.get('/', async (_req, _resp) => {
    const hits = await AtBatHits.find().populate('user', '-password').populate('game').sort({ gameNo: 1});
    _resp.json({
        ok: true,
        hits,
    })
});

export default atBatHitsRoutes;