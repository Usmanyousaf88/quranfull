import React, { useState } from 'react';
import { Input } from './ui/input';
import { useSearchVerses } from '../services/quranApi';
import SearchResults from './SearchResults';
import { useDebounce } from '../hooks/useDebounce';

interface SearchBarProps {
  surahs: Array<{
    number: number;
    englishName: string;
  }>;
}

const SearchBar = ({ surahs }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data: results, isLoading, error } = useSearchVerses(debouncedSearch);

  return (
    <div className="w-full space-y-4">
      <Input
        type="search"
        placeholder="Search verses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
      {searchTerm.length >= 3 && (
        <SearchResults
          results={results || []}
          isLoading={isLoading}
          error={error as Error}
        />
      )}
    </div>
  );
};

export default SearchBar;