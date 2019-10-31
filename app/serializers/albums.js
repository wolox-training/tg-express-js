module.exports = albums => ({
  albums: albums.map(album => ({
    user_id: album.userId,
    id: album.id,
    title: album.title
  }))
});
