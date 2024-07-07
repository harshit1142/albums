import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"

const GET_ALBUMS = gql`
  query GetAlbums {
    albums {
      data {
        id
        title
      }
    }
  }
`;

const Albums = () => {
  var { loading, error, data } = useQuery(GET_ALBUMS);
  const [search, setSearch] = useState('');
  const [albums, setAlbums] = useState(data?.albums?.data);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if(data && !albums){
    setAlbums(data.albums.data)
  }

  function handleSearch(){
   
      let filteredAlbums = data.albums.data.filter((album: { title: string }) =>
    album.title.toLowerCase().includes(search.toLowerCase()))
     setAlbums(filteredAlbums);
  }
  
  function handleSort(){
   
    let sortedAlbums = [...albums].sort((a, b) => a.title.localeCompare(b.title));
    setAlbums(sortedAlbums);
    console.log(albums);
    
  }

  
 

  return (
    <div className="container-fluid p-4 bg-gray-200 w-full min-h-screen h-full" >
      <h1 className="font-bold mb-4 text-center text-red-400  text-4xl">Albums</h1>
      
      <Input
        placeholder="Search albums"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <div className='flex justify-center'>
     <button onClick={handleSearch}   className='ms-2 p-3 bg-indigo-100'>  Search</button>
     <button onClick={handleSort} className='ms-2 p-3 bg-indigo-100'>  Sort [A-Z]</button>
      </div>
     {(loading) && <h1 className='text-gray-500 text-5xl text-center mt-7'>Loading...</h1>}
     {(albums && albums.length==0) && <h1 className='text-gray-500 text-5xl text-center mt-7'>No Album Found</h1>}
    
      <div className="flex flex-wrap w-full">
        {albums && albums.map((album: { id: string; title: string }) => (
        
         <li key={album.id} className="mb-2 text-lg w-96 m-2 p-3 bg-indigo-200">
            {album.title}
          </li>
          

        ))}
      </div>
    </div>
  );
};

export default Albums;
