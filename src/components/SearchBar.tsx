interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

function SearchBar({
  searchTerm,
  onSearchChange,
}: SearchBarProps) {
  return (
    <div className="search-container">

      <div className="search-input-wrapper">

        <span className="search-icon">
          ⌕
        </span>

        <input
          type="search"
          value={searchTerm}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search bookmarks..."
          aria-label="Search bookmarks"
        />

      </div>

    </div>
  );
}

export default SearchBar;