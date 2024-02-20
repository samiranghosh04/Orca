// SearchBar.js
import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { Flex,  useColorMode, Avatar, Box } from '@chakra-ui/react';


// Trie.js
class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
    }
  }
  
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    insert(word) {
      let node = this.root;
  
      for (const char of word) {
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
      }
  
      node.isEndOfWord = true;
    }
  
    search(prefix) {
      let node = this.root;
  
      for (const char of prefix) {
        if (!node.children[char]) {
          return [];
        }
        node = node.children[char];
      }
  
      return this._getAllWords(node, prefix);
    }
  
    _getAllWords(node, prefix) {
      const words = [];
  
      const traverse = (currentNode, currentWord) => {
        if (currentNode.isEndOfWord) {
          words.push(prefix + currentWord);
        }
  
        for (const [char, childNode] of Object.entries(currentNode.children)) {
          traverse(childNode, currentWord + char);
        }
      };
  
      traverse(node, '');
      return words;
    }
  }
  

// SearchBar
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const trie = new Trie();
  const { colorMode } = useColorMode();

  // For demonstration purposes, you can replace this with your dynamic data fetching logic
  const userProfiles = [
    { username: 'john_doe', name: 'John Doe', avatar: 'url_to_john_avatar' },
    // Add more user profiles as needed
  ];

  // Populate the trie with usernames
  userProfiles.forEach(({ username, name }) => {
    trie.insert(username.toLowerCase());
    trie.insert(name.toLowerCase());
  });

  const handleSearch = () => {
    if (query.trim() !== '') {
      onSearch(query);
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const prefix = value.toLowerCase();
    const suggestionsList = trie.search(prefix);
    setSuggestions(suggestionsList);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    setQuery(suggestion);
    handleSearch();
  };

  const renderSuggestion = (suggestion) => {
    // Find the matching user profile for the suggestion
    const userProfile = userProfiles.find(
      ({ username, name }) => username.toLowerCase() === suggestion.toLowerCase() || name.toLowerCase() === suggestion.toLowerCase()
    );

    return (
      <Flex align="center" justify="space-between" p={2} >
        <Box>
          <Avatar size="sm" src={userProfile?.avatar} alt={userProfile?.name} mr={2} />
          {userProfile?.name}
        </Box>
        <Box>{userProfile?.username}</Box>
      </Flex>
    );
  };

  const inputProps = {
    placeholder: 'Search...',
    value: query,
    onChange: (_, { newValue }) => setQuery(newValue),
    style: {
      width: '100%', // Take full width of the container
      padding: '10px', // Add padding to the input field
      background: colorMode === 'light' ? 'white' : 'gray.800',
      color: colorMode === 'light' ? 'black' : 'white',
      borderRadius: 'md',
      borderColor: colorMode === 'light' ? 'gray.300' : 'gray.600',
    },
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default SearchBar;
