import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method == 'POST') {
        if (!req.body.title | !req.body.content) {
            return res.status(500).json('내용을 입력해주세요.');
        }
        try {
            const db = (await connectDB).db('forum');
            const result = await db.collection('post').updateOne(
                { _id: new ObjectId(req.body._id) },
                {
                    $set: { title: req.body.title, content: req.body.content },
                }
            );
            //return res.status(200).json("변경성공.");
            console.log('result :: ', result);
            res.redirect(302, '/list');
        } catch (error) {
            console.log(error);
            return res.status(500).json('데이터 저장 문제 발생.');
        }
    }
}
