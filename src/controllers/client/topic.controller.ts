import Topic from '../../models/topic.model';
import { Request, Response } from 'express';

// [GET] /topics
export const topics = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  });
  console.log(topics)
  res.render('client/pages/topics/index', {
    title: "Chủ đề bài hát",
  });
};
