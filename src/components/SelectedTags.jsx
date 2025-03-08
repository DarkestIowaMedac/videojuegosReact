const SelectedTags = ({ tags, onRemoveTag }) => {
    if (!tags || tags.length === 0) {
      return null;
    }
  
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map(tag => (
          <div 
            key={tag.id} 
            className="flex oscuro items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
          >
            <span>{tag.name}</span>
            <button 
              onClick={() => onRemoveTag(tag.id)} 
              className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label={`Eliminar tag ${tag.name}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  export default SelectedTags;