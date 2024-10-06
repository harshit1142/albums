import { Album } from '@/types';

interface AlbumItemProps {
  album: Album;
}

const AlbumItem: React.FC<AlbumItemProps> = ({ album }) => (
  <div className="bg-indigo-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <img
      src={album.photos.data[0]?.thumbnailUrl || 'placeholder.jpg'}
      alt={`Thumbnail for album ${album.title}`}
      className="w-full h-40 object-cover mb-4 rounded-md"
      loading="lazy"
    />
    <h2 className="text-lg font-bold">{album.title}</h2>
    <p className="text-sm text-gray-600">Album ID: {album.id}</p>
  </div>
);

export default AlbumItem;
