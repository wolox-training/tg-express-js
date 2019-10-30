module.exports = albumPhotos =>
  albumPhotos.map(photo => ({
    album_id: photo.albumId,
    id: photo.id,
    title: photo.title,
    url: photo.url,
    thumbnail_url: photo.thumbnailUrl
  }));
