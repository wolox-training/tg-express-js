const albums = albumsData => ({
  albums: albumsData.map(album => ({
    user_id: album.userId,
    id: album.id,
    title: album.title
  }))
});

const albumPhotos = albumPhotosData => ({
  album_photos: albumPhotosData.map(photo => ({
    album_id: photo.albumId,
    id: photo.id,
    title: photo.title,
    url: photo.url,
    thumbnail_url: photo.thumbnailUrl
  }))
});

const boughtAlbum = boughtAlbumData => ({
  id: boughtAlbumData.id,
  user_id: boughtAlbumData.userId,
  album_id: boughtAlbumData.albumId,
  created_at: boughtAlbumData.createdAt,
  updated_at: boughtAlbumData.updatedAt
});

module.exports = {
  albums,
  albumPhotos,
  boughtAlbum
};
