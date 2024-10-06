import AlbumList from '@/components/ui/albums/AlbumList';
import ErrorMessage from '@/components/ui/comp/ErrorMessage';
import LoadingSpinner from '@/components/ui/comp/Loading';
import Sort from '@/components/ui/comp/Sort';
import SearchBar from '@/components/ui/Search/SearchBar';
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState, useCallback } from 'react';
import { Album } from '@/types';

const GET_ALBUMS = gql`
  query GetAlbums {
    albums {
      data {
        id
        title
        photos(options: { paginate: { limit: 1 } }) {
          data {
            thumbnailUrl
          }
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

const Albums: React.FC = () => {
  const [search, setSearch] = useState('');
  const [albums, setAlbums] = useState<Album[]>([]);
  const [sortAsc, setSortAsc] = useState(true);

  const { loading, error, data } = useQuery(GET_ALBUMS);

  useEffect(() => {
    if (data) {
      setAlbums(data.albums.data);
    }
  }, [data]);

  // Debounce function to handle the search
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce(() => {
      if (search.trim() === '') {
        setAlbums(data.albums.data);
      } else {
        const filteredAlbums = data.albums.data.filter((album: Album) =>
          album.title.toLowerCase().includes(search.toLowerCase())
        );
        setAlbums(filteredAlbums);
      }
    }, 300),
    [search, data]
  );

  const handleSort = () => {
    const sortedAlbums = [...albums].sort((a, b) =>
      sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    setAlbums(sortedAlbums);
    setSortAsc(!sortAsc);
  };

  const clearSearch = () => {
    setSearch('');
    setAlbums(data.albums.data);
  };

  return (
    <div className="container-fluid p-4 bg-gray-200 w-full min-h-screen h-full">
      <h1 className="font-bold mb-4 text-center text-red-400 text-4xl">Albums</h1>
      <SearchBar search={search} setSearch={setSearch} handleSearch={handleSearch} />
      <Sort handleSort={handleSort} clearSearch={clearSearch} sortAsc={sortAsc} />

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} />}
      {!loading && albums.length === 0 && <h1>No Albums Found</h1>}

      <AlbumList albums={albums} />
    </div>
  );
};

export default Albums;
