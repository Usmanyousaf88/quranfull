import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';

interface SearchResult {
  verse: {
    number: number;
    text: string;
    numberInSurah: number;
    translation: string;
  };
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error: Error | null;
}

const SearchResults = ({ results, isLoading, error }: SearchResultsProps) => {
  if (isLoading) {
    return <div className="text-center py-4">Searching...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error.message}</div>;
  }

  if (!results?.length) {
    return <div className="text-center text-gray-500 py-4">No results found</div>;
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Card key={result.verse.number} className="hover:border-primary transition-colors">
          <CardContent className="pt-6">
            <Link to={`/surah/${result.surah.number}#verse-${result.verse.numberInSurah}`}>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">
                    {result.surah.englishName} ({result.verse.numberInSurah})
                  </h3>
                  <span className="text-sm text-gray-500">
                    Verse {result.verse.numberInSurah}
                  </span>
                </div>
                <p className="arabic-text text-right">{result.verse.text}</p>
                <p className="text-gray-600">{result.verse.translation}</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;