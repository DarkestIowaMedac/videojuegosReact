import { useState, useEffect, useRef } from 'react';
import { fetchTags } from '../services/api';

const TagSearch = ({ onTagSelect, selectedTags }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  // Manejar clics fuera del dropdown para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Buscar tags cuando cambia la consulta
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setTags([]);
      setShowDropdown(false);
      return;
    }

    // Limpiar el timeout anterior si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Configurar un nuevo timeout para buscar después de 500ms de inactividad
    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const fetchedTags = await fetchTags(searchQuery);
        // Filtrar tags que ya están seleccionados
        if (Array.isArray(fetchedTags)) {
        const filteredTags = fetchedTags.filter(
          tag => !selectedTags.some(selectedTag => selectedTag.id === tag.id)
        );
        setTags(filteredTags);
        setShowDropdown(filteredTags.length > 0);
        } else {
            setTags([]);
            setShowDropdown(false); 
        }
      } catch (error) {
        console.error('Error al buscar tags:', error);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery, selectedTags]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTagClick = (tag) => {
    onTagSelect(tag);
    setSearchQuery('');
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-xs" ref={dropdownRef}>
      <div className="flex items-center border rounded overflow-hidden">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Buscar tags..."
          className="p-2 w-full focus:outline-none"
        />
        {isLoading && (
          <div className="px-2">
            <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {showDropdown && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
          {tags.map(tag => (
            <div
              key={tag.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleTagClick(tag)}
            >
              {tag.name} ({tag.games_count})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagSearch;