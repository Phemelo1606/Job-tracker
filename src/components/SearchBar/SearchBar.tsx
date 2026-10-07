type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  ariaLabel = "Search",
}: SearchBarProps) {
  return (
    <input
      className={className}
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
    />
  );
}