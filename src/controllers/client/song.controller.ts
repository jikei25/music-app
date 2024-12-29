import Song from '@/models/song.model';
import Topic from '../../models/topic.model';
import { Request, Response } from 'express';
import Singer from '@/models/singer.model';
import FavoriteSong from '@/models/favorite-song.model';
// [GET] /songs/:slugTopic
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

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  try {
    const slugSong: String = req.params.slugSong;
    const song = await Song.findOne({
      slug: slugSong,
      deleted: false,
      status: 'active',
    });
    if (!song) {
      res.status(400).json({
        message: 'Bad request',
      });
    }
    const singer = await Singer.findOne({
      _id: song.singerId,
      deleted: false,
      status: 'active',
    });

    const topic = await Topic.findOne({
      _id: song.topicId,
      deleted: false,
      status: 'active',
    });

    res.render('client/pages/songs/detail', {
      title: 'Chi tiết bài hát',
      song: song,
      singer: singer,
      topic: topic,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// [PATCH] /songs/like
export const like = async (req: Request, res: Response) => {
  const { id, typeLike } = req.body;

  const song = await Song.findById(id);
  if (!song) {
    res.status(400).json({
      message: 'Bad request',
    });
    return;
  }

  switch (typeLike) {
    case 'like':
      song.like += 1;
      await song.save();
      break;
    case 'unlike':
      song.like -= 1;
      await song.save();
      break;
    default:
      res.status(400).json({
        message: 'Bad request',
      });
      return;
  }
  res.status(200).json({
    message: 'Success',
    like: song.like,
  });
};

// [PATCH] /songs/favorite
export const favorite = async (req: Request, res: Response) => {
  const id = req.body.id;
  const song = await Song.findOne({
    _id: id,
    deleted: false,
    status: 'active',
  });

  if (song) {
    const existSong = await FavoriteSong.findOne({
      songId: id,
      // userId: res.locals.user.id
    });

    if (existSong) {
      await FavoriteSong.deleteOne({
        songId: id,
        // userId: res.locals.user.id
      });
    } else {
      const record = new FavoriteSong({
        songId: id,
        // userId: res.locals.user.id
      });

      await record.save();
    }

    res.json({
      code: 'success',
    });
  } else {
    res.json({
      code: 'error',
    });
  }
};
