import { useState } from 'react';
import { motion } from 'framer-motion';

const SearchBox = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    onSearch(input);
  };

  return (
    <div className="search-box">
      <input 
        type="text" 
        placeholder="Search city..." 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
      />
      <motion.button 
        onClick={handleSearch}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        GO
      </motion.button>
    </div>
  );
};

export default SearchBox;