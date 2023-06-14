import { Router, Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import { Cat, ListCats, RateCatResponse } from '../interfaces/cat';
import { dbJsonPath } from '../config';

const router = Router();

router.get(
	'/random',
	(req: Request, res: Response<Cat>, next: NextFunction) => {
		const cats: Cat[] = JSON.parse(
			fs.readFileSync(path.join(__dirname, '../', dbJsonPath), 'utf8')
		);
		const randomCat = cats[Math.floor(Math.random() * cats.length)];
		res.status(200).json(randomCat);
	}
);

router.get('/', (req: Request, res: Response<ListCats>, next: NextFunction) => {
	const cats: Cat[] = JSON.parse(
		fs.readFileSync(path.join(__dirname, '../', dbJsonPath), 'utf8')
	);
	const listCats: ListCats = { cats };
	res.status(200).json(listCats);
});

router.get(
	'/:id',
	(req: Request, res: Response<Cat | string>, next: NextFunction) => {
		const cats: Cat[] = JSON.parse(
			fs.readFileSync(path.join(__dirname, '../', dbJsonPath), 'utf8')
		);
		const cat = cats.find((cat) => cat.id === req.params.id);
		if (cat) {
			res.status(200).json(cat);
		} else {
			res.status(404).json('Cat not found');
		}
	}
);

router.put(
	'/:id/rate/:rating',
	(req: Request, res: Response<RateCatResponse>, next: NextFunction) => {
		if (
			parseInt(req.params.rating) < 1 ||
			parseInt(req.params.rating) > 5
		) {
			res.status(400).json({
				success: false,
				message: 'Rating must be between 1 and 5',
			});
		}

		if (
			isNaN(parseInt(req.params.rating)) ||
			parseInt(req.params.rating) < 0
		) {
			res.status(400).json({
				success: false,
				message: 'Rating must be a positive number',
			});
		}

		const cats: Cat[] = JSON.parse(
			fs.readFileSync(path.join(__dirname, '../', dbJsonPath), 'utf8')
		);
		const catIndex = _.findIndex(cats, { id: req.params.id });

		if (catIndex === -1) {
			res.status(404).json({
				success: false,
				message: 'Cat not found',
			});
		} else {
			cats[catIndex].rating = parseInt(req.params.rating);
			cats[catIndex].rating_count += 1;
			cats[catIndex].rating_sum += parseInt(req.params.rating);
			fs.writeFileSync(
				path.join(__dirname, '../', dbJsonPath),
				JSON.stringify(cats)
			);
			res.status(200).json({ ...cats[catIndex], success: true });
		}
	}
);

export default router;
