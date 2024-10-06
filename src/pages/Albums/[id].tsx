import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/components/ui/comp/Loading';
import ErrorMessage from '@/components/ui/comp/ErrorMessage';
import { Album, Photo } from '@/types';

const GET_ALBUM = gql`
  query GetAlbum($id: ID!) {
    album(id: $id) {
      id
      title
      photos {
        data {
          url
          thumbnailUrl
        }
      }
    }
  }
`;

const AlbumDetail: React.FC<{ album: Album }> = ({ album: initialAlbum }) => { // Rename the parameter
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_ALBUM, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const album = data.album; // This is now distinct from the parameter

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{album.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {album.photos.data.map((photo: Photo) => ( // Specify the type here
          <div key={photo.thumbnailUrl} className="mb-4"> {/* Use a unique key */}
            <img src={photo.thumbnailUrl} alt={album.title} className="w-full h-auto rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumDetail;
