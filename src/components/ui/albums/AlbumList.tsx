import Link from 'next/link';
import { Album } from '@/types';

const AlbumList: React.FC<{ albums: Album[] }> = ({ albums }) => (
  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {albums.map((album) => (
      <Link key={album.id} href={`/albums/${album.id}`}>
        <div className="bg-indigo-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <img
            src={album.photos.data[0]?.thumbnailUrl || 'placeholder.jpg'}
            alt={`Thumbnail for album ${album.title}`}
            className="w-full h-40 object-cover mb-4 rounded-md"
          />
          <h2 className="text-lg font-bold">{album.title}</h2>
          <p className="text-sm text-gray-600">Album ID: {album.id}</p>
        </div>
      </Link>
    ))}
  </ul>
);

export default AlbumList;
