import React from "react";
import { Input } from "./ui/input";
import { Search, Palette, Book, Heart, Trophy, X } from "lucide-react";

interface CategoryButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
  isSelected?: boolean;
}

const CategoryButton = ({
  icon,
  label,
  color,
  onClick,
  isSelected,
}: CategoryButtonProps) => (
  <div
    className={`relative rounded-xl border ${isSelected ? "ring-2 ring-blue-500" : ""} hover:border-blue-500/50 transition-colors bg-white/50 backdrop-blur-sm group`}
    onClick={onClick}
  >
    <div className="flex flex-col items-center gap-2 p-4 w-full">
      <div
        className={`p-4 rounded-full ${color} transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}
      >
        {icon}
      </div>
      <span
        className={`text-sm font-medium transition-colors ${isSelected ? "text-blue-600 font-semibold" : ""} group-hover:text-blue-500`}
      >
        {label}
      </span>
    </div>
  </div>
);

interface SearchFilterBarProps {
  onSearch?: (searchTerm: string) => void;
  onCategorySelect?: (category: string) => void;
  className?: string;
}

const SearchFilterBar = ({
  onSearch = () => {},
  onCategorySelect = () => {},
  className = "",
}: SearchFilterBarProps) => {
  const [searchText, setSearchText] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const handleSearch = (value: string) => {
    setSearchText(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchText("");
    onSearch("");
    const input = document.querySelector(
      'input[placeholder="Search clubs..."]',
    ) as HTMLInputElement;
    if (input) input.value = "";
  };

  const categories = [
    {
      icon: <Trophy className="w-8 h-8 text-white" />,
      label: "Sports",
      color: "bg-blue-600",
    },
    {
      icon: <Palette className="w-8 h-8 text-white" />,
      label: "Creativity",
      color: "bg-green-600",
    },
    {
      icon: <Book className="w-8 h-8 text-white" />,
      label: "Academics",
      color: "bg-amber-500",
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      label: "Service",
      color: "bg-red-500",
    },
  ];

  return (
    <div className={`w-full max-w-5xl mx-auto px-4 py-8 ${className}`}>
      {/* Search Bar */}
      <div className="relative mb-8">
        <Input
          placeholder="Search clubs..."
          className="pl-8 pr-16 h-16 text-xl rounded-full border border-blue-200 bg-blue-50/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:ring-1 focus-visible:ring-blue-400 focus-visible:border-blue-300"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchText}
        />
        {searchText && (
          <button
            className="absolute right-[68px] top-1/2 transform -translate-y-1/2 p-[5px] bg-black/60 hover:bg-black/70 text-white rounded-full transition-all"
            onClick={clearSearch}
          >
            <X className="h-2.5 w-2.5 stroke-[3]" />
          </button>
        )}
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all"
          onClick={() => handleSearch(searchText)}
        >
          <Search className="h-6 w-6" />
        </button>
      </div>

      {/* Category Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryButton
            key={category.label}
            icon={category.icon}
            label={category.label}
            color={category.color}
            isSelected={
              selectedCategory.toLowerCase() === category.label.toLowerCase()
            }
            onClick={() => {
              const newCategory =
                selectedCategory.toLowerCase() === category.label.toLowerCase()
                  ? ""
                  : category.label;
              onCategorySelect(newCategory);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchFilterBar;
