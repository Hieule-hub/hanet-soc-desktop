import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		res.status(200).json({
			statusCode: 200,
			result: { success: true },
		});
	} else {
		res.status(404).json({ message: 'Api is not found' });
	}
}
