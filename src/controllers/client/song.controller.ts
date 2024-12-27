import Song from '@/models/song.model';
import Topic from '../../models/topic.model';
import { Request, Response } from 'express';
import Singer from '@/models/singer.model';

// [GET] /:slugTopic
export const index = async (req: Request, res: Response) => {
  try {
    const slugTopic: string = req.params.slugTopic;
    const topic = await Topic.findOne({
      slug: slugTopic,
      deleted: false,
      status: 'active',
    });
    if (!topic) {
      res.json(400).json({
        message: "Can't find topic",
      });
    }
    
    const songs = await Song.find({
      topicId: topic.id,
      status: 'active',
      deleted: false,
    }).select('id title avatar singerId like slug');

    for (const song of songs) {
      const infoSinger = await Singer.findOne({
        _id: song.singerId,
        deleted: false,
        status: 'active',
      });

      song['singerFullName'] = infoSinger ? infoSinger.fullName : '';
    }

    res.render('client/pages/songs/index', {
      title: 'Danh sách bài hát',
      songs: songs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
