import { useState } from 'react';
import { ColorRecord, ColorRecordResponse } from '@generated/client';
import { searchColors } from '../services/api';

export const SearchColors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ColorRecordResponse>({} as ColorRecordResponse);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      setHasSearched(true);
      const response = await searchColors(searchTerm);
      setResults(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search colors');
      setResults({} as ColorRecordResponse);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch}>
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search by First Name
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Enter first name..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              type="submit"
              className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </div>
      </form>

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
          {results?.data?.colors 
            && results.data.colors.length > 0 
            && results.data.colors.map((color, index: number) => (
            <div
              key={`${results?.data?.pk}-${index}`}
              className="rounded-lg border border-gray-200 p-4 shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div
                  className="h-8 w-8 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="font-medium text-gray-900">{results?.data?.pk}</p>
                  <p className="text-sm text-gray-500">
                    Color: {color}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {(!results?.data || (results?.data?.colors && results?.data?.colors?.length === 0 && hasSearched)) && (
            <p className="text-sm text-gray-500">
              No results found for "{searchTerm}"
            </p>
          )}
          {!hasSearched && !isLoading && (
            <p className="text-sm text-gray-500">
              Enter a name and click Search to find colors
            </p>
          )}
        </div>
      )}
    </div>
  );
}; 