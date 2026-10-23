import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Search stories, places, neighbourhoods…', large = false, children }) {
  return (
    <form
      className={`searchbar ${large ? 'searchbar-lg' : ''}`}
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
    >
      <Search size={large ? 22 : 18} aria-hidden="true" />
      <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-label={placeholder} />
      {value && (
        <button type="button" className="icon-btn" onClick={() => onChange('')} aria-label="Clear search">
          <X size={16} />
        </button>
      )}
      {large && <button type="submit" className="btn btn-dark btn-sm">Search</button>}
      {children}
    </form>
  );
}
