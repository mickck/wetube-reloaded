import Video from '../models/Video';

const handleSearch = (error, videos) => {
  console.log('error', error);
  console.log('video', videos);
};
/*
console.log("start")
Video.find({}, (error, videos) => {
  return res.render("home", { pageTitle: "Home", videos });
});
console.log("finished")
*/

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: 'desc' });
  // console.log(videos);

  return res.render('home', { pageTitle: 'Home', videos });
};
export const watch = async (req, res) => {
  const { id } = req.params;
  //const id =req.params.id;
  const video = await Video.findById(id);

  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video is not found' });
  }
  return res.render('watch', { pageTitle: video.title, video });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video is not found' });
  }
  return res.render('edit', { pageTitle: `Edit!!! ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;

  const video = await Video.exists(id);
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video is not found' });
  }
  /*video.title = title;video.description = description; video.hashtags = hashtags.split(',').map((word) => (word.startsWith('#') ? word : `#${word}`));
  await video.save(); */
  await Video.findByIdAndUpdate(id, { title, description, hashtags: Video.formatHashtags(hashtags) });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render('upload', { pageTitle: 'Upload Video' });
};
export const postUpload = async (req, res) => {
  // here we will add a video to the videos array
  const { title, description, hashtags } = req.body;

  /* const video = new Video;
     await video.save();  ->> await Video.create  makes easy and once. */
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect('/');
  } catch (error) {
    return res.status(400).render('upload', {
      pageTitle: 'Upload Video',
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  //delete video
  await Video.findByIdAndDelete(id);
  return res.redirect('/');
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    //search
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}*`, 'i'),
      },
    });
  }
  return res.render('search', { pageTitle: 'Search', videos });
};
