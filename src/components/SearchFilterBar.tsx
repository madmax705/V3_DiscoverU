import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Search,
  Palette,
  Book,
  Heart,
  Trophy,
  X,
  Users,
  Calendar,
  MapPin,
} from "lucide-react";

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
  onMemberCountFilter?: (range: string) => void;
  onMeetingDayFilter?: (day: string) => void;
  onAdvisorFilter?: (advisor: string) => void;
  className?: string;
  showAdditionalFilters?: boolean;
  showSearchAndCategories?: boolean;
  showCategoryButtons?: boolean;
}

const SearchFilterBar = ({
  onSearch = () => { },
  onCategorySelect = () => { },
  onMemberCountFilter = () => { },
  onMeetingDayFilter = () => { },
  onAdvisorFilter = () => { },
  className = "",
  showAdditionalFilters = false,
  showSearchAndCategories = true,
  showCategoryButtons = true,
}: SearchFilterBarProps) => {
  const [searchText, setSearchText] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedMemberCount, setSelectedMemberCount] = React.useState("");
  const [selectedMeetingDay, setSelectedMeetingDay] = React.useState("");
  const [selectedAdvisor, setSelectedAdvisor] = React.useState("");

  const handleSearch = (value: string) => {
    setSearchText(value);
    onSearch(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };

  const handleValueChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    handler: (value: string) => void,
    value: string,
  ) => {
    const actualValue =
      value === "any_size" || value === "any_day" || value === "any_advisor"
        ? ""
        : value;
    setter(actualValue);
    handler(actualValue);
  };

  const clearSearch = () => {
    setSearchText("");
    onSearch("");
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

  const memberCountRanges = [
    { label: "Small (1-15 members)", value: "small" },
    { label: "Medium (16-25 members)", value: "medium" },
    { label: "Large (26+ members)", value: "large" },
  ];

  const meetingDays = [
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
  ];

  const advisors = [
    "Dr. Knight",
    "Ms. Zhang",
    "Coach Wilson",
    "Ms. Melody",
    "Dr. Fisher",
    "Mr. Keynes",
    "Ms. Hope",
    "Mr. Scales",
    "Ms. Stage",
    "Coach Johnson",
    "Coach Smith",
    "Ms. Business",
    "Dr. Calculus",
    "Ms. Wordsworth",
    "Ms. Picasso",
    "Mr. Tech",
    "Ms. Media",
    "Mr. Broadcast",
    "Ms. Green",
  ];

  const clearAllFilters = () => {
    setSearchText("");
    setSelectedCategory("");
    setSelectedMemberCount("");
    setSelectedMeetingDay("");
    setSelectedAdvisor("");
    onSearch("");
    onCategorySelect("");
    onMemberCountFilter("");
    onMeetingDayFilter("");
    onAdvisorFilter("");
    const input = document.querySelector(
      'input[placeholder="Search clubs..."]',
    ) as HTMLInputElement;
    if (input) input.value = "";
  };

  const hasActiveFilters =
    searchText ||
    selectedCategory ||
    selectedMemberCount ||
    selectedMeetingDay ||
    selectedAdvisor;

  return (
    <div className={`w-full max-w-5xl mx-auto px-4 py-8 ${className}`}>
      {/* Search Bar and Category Buttons - Only shown when showSearchAndCategories is true */}
      {showSearchAndCategories && (
        <>
          <div className="relative mb-8">
            <Input
              placeholder="Search clubs..."
              className="pl-8 pr-16 h-16 text-xl rounded-full border border-blue-200 bg-blue-50/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:ring-1 focus-visible:ring-blue-400 focus-visible:border-blue-300"
              onChange={handleInputChange}
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
              type="button"
            >
              <Search className="h-6 w-6" />
            </button>
          </div>

          {/* Category Buttons - Only shown when showCategoryButtons is true */}
          {showCategoryButtons && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {categories.map((category) => (
                <CategoryButton
                  key={category.label}
                  icon={category.icon}
                  label={category.label}
                  color={category.color}
                  isSelected={
                    selectedCategory.toLowerCase() ===
                    category.label.toLowerCase()
                  }
                  onClick={() => {
                    const newCategory =
                      selectedCategory.toLowerCase() ===
                        category.label.toLowerCase()
                        ? ""
                        : category.label;
                    setSelectedCategory(newCategory);
                    onCategorySelect(newCategory);
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Additional Filters - Only shown when showAdditionalFilters is true */}
      {showAdditionalFilters && (
        <div className="relative mt-8">
          <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-xl opacity-60 animate-gradient"></div>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg relative border border-blue-100/50 hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-center h-10 mb-6">
              <h3 className="text-2xl font-bold text-blue-600">Additional Filters</h3>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all h-8"
                  onClick={clearAllFilters}
                >
                  <X className="h-3 w-3" /> Clear all filters
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Member Count Filter */}
              <div className="group">
                <label className="block text-base font-medium mb-3 flex items-center gap-2 text-blue-600 group-hover:text-blue-700 transition-colors">
                  <Users className="h-5 w-5" /> Club Size
                </label>
                <Select
                  value={selectedMemberCount}
                  onValueChange={(value) =>
                    handleValueChange(
                      setSelectedMemberCount,
                      onMemberCountFilter,
                      value,
                    )
                  }
                >
                  <SelectTrigger className="w-full h-12 border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-gray-200 transition-all text-black hover:text-black focus:text-black">
                    <SelectValue placeholder="Any size" className="text-black" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-100 shadow-lg rounded-lg animate-in fade-in-0 zoom-in-95 duration-200 [&_*]:text-black [&_*]:hover:text-black">
                    <SelectItem value="any_size" className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer transition-colors text-black hover:text-black focus:text-black">Any size</SelectItem>
                    {memberCountRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value} className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer transition-colors text-black hover:text-black focus:text-black">
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Meeting Day Filter */}
              <div className="group">
                <label className="block text-base font-medium mb-3 flex items-center gap-2 text-purple-600 group-hover:text-purple-700 transition-colors">
                  <Calendar className="h-5 w-5" /> Meeting Day
                </label>
                <Select
                  value={selectedMeetingDay}
                  onValueChange={(value) =>
                    handleValueChange(
                      setSelectedMeetingDay,
                      onMeetingDayFilter,
                      value,
                    )
                  }
                >
                  <SelectTrigger className="w-full h-12 border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-gray-200 transition-all text-black hover:text-black focus:text-black">
                    <SelectValue placeholder="Any day" className="text-black" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-100 shadow-lg rounded-lg animate-in fade-in-0 zoom-in-95 duration-200 [&_*]:text-black [&_*]:hover:text-black">
                    <SelectItem value="any_day" className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer transition-colors text-black hover:text-black focus:text-black">Any day</SelectItem>
                    {meetingDays.map((day) => (
                      <SelectItem key={day.value} value={day.value} className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer transition-colors text-black hover:text-black focus:text-black">
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Categories Filter */}
              <div className="group">
                <label className="block text-base font-medium mb-3 flex items-center gap-2 text-blue-600 group-hover:text-blue-700 transition-colors">
                  <Palette className="h-5 w-5" /> Categories
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) =>
                    handleValueChange(setSelectedCategory, onCategorySelect, value)
                  }
                >
                  <SelectTrigger className="w-full h-12 border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-gray-200 transition-all text-black hover:text-black focus:text-black">
                    <SelectValue placeholder="Any category" className="text-black" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-100 shadow-lg rounded-lg animate-in fade-in-0 zoom-in-95 duration-200 [&_*]:text-black [&_*]:hover:text-black">
                    <SelectItem value="any_category" className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer transition-colors text-black hover:text-black focus:text-black">Any category</SelectItem>
                    <SelectItem value="Sports" className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer transition-colors text-black hover:text-black focus:text-black">Sports</SelectItem>
                    <SelectItem value="Creativity" className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer transition-colors text-black hover:text-black focus:text-black">Creativity</SelectItem>
                    <SelectItem value="Academics" className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer transition-colors text-black hover:text-black focus:text-black">Academics</SelectItem>
                    <SelectItem value="Service" className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer transition-colors text-black hover:text-black focus:text-black">Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;
