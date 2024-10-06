export interface Photo {
  thumbnailUrl: string;
}

export interface Album {
  id: string;
  title: string;
  photos: {
    data: Photo[];
  };
}

export interface SortProps {
  handleSort: () => void;
  clearSearch: () => void;
  sortAsc: boolean;
}
