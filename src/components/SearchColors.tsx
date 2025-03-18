import { useState, useEffect } from 'react';
import { ColorSearchResult } from '../types/api';
import { searchColors } from '../services/api';

export const SearchColors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ColorSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (term: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await searchColors(term);
      setResults(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search colors');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch(searchTerm);
      } else {
        handleSearch('');
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Search by First Name
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter first name..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-sm text-gray-600">
          Searching...
        </div>
      ) : (
        <div className="space-y-2">
          {results.map((result, index) => (
            <div
              key={`${result.firstName}-${index}`}
              className="rounded-lg border border-gray-200 p-4 shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div
                  className="h-8 w-8 rounded-full"
                  style={{ backgroundColor: result.favoriteColor }}
                />
                <div>
                  <p className="font-medium text-gray-900">{result.firstName}</p>
                  <p className="text-sm text-gray-500">
                    Favorite color: {result.favoriteColor}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {results.length === 0 && !isLoading && (
            <p className="text-sm text-gray-500">
              {searchTerm ? 'No results found' : 'No colors submitted yet'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}; 