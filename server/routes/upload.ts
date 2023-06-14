import { Router, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';
import { generateRandomString } from '../utils';
import { dbJsonPath } from '../config';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './server/storage/images');
	},
	filename: (req, file, cb) => {
		cb(null, `${generateRandomString(19)}-${file.originalname}`);
	},
});

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 10 * 1024 * 1024, // 10MB max file size
		files: 10, // max 10 files
	},
});

const router = Router();

router.post('/', upload.array('image', 10), (req: Request, res: Response) => {
	const files = req.files as Express.Multer.File[];
	const { body } = req;
	if (
		!files ||
		!files.length ||
		!body.name ||
		!Array.isArray(body.name) ||
		body.name.length !== files.length
	) {
		return res
			.status(400)
			.json(
				'Invalid request, each image should have a corresponding name'
			);
	}

	const db = JSON.parse(
		fs.readFileSync(path.join(__dirname, '../', dbJsonPath), 'utf8')
	);

	const newCats = files.map((file, index) => {
		const newCat = {
			id: generateRandomString(19),
			image: `./storage/images/${file.filename}`,
			title: body.name[index],
			date: new Date(),
			rating: 0,
			rating_count: 0,
			rating_sum: 0,
		};
		db.push(newCat);
		return newCat;
	});

	fs.writeFileSync(
		path.join(__dirname, '../', dbJsonPath),
		JSON.stringify(db)
	);

	res.status(201).json(newCats);
});

export default router;
