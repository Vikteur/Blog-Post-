import { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // In a real application, this would trigger the search functionality
  };
  return <form onSubmit={handleSearch} className="w-full" role="search">
      <div className="relative">
        <label htmlFor="search-input" className="sr-only">
          Search posts
        </label>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
          <SearchIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        </div>
        <Input
          type="search"
          id="search-input"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search posts by title or topic..."
          className="pl-10"
        />
      </div>
      <button type="submit" className="sr-only">
        Search
      </button>
    </form>;
}