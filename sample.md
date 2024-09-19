sample code generated from llamacoder . together . ai
```
import { useState } from 'react';

interface Kinship {
  relationship: string;
  translation: string;
}

interface RelationshipOption {
  label: string;
  value: string;
}

const relationshipOptions: RelationshipOption[] = [
  { label: 'Brother', value: 'brother' },
  { label: 'Sister', value: 'sister' },
  { label: 'Mother', value: 'mother' },
  { label: 'Father', value: 'father' },
  { label: 'Son', value: 'son' },
  { label: 'Daughter', value: 'daughter' },
  { label: 'Grandfather', value: 'grandfather' },
  { label: 'Grandmother', value: 'grandmother' },
];

const kinships: Kinship[] = [
  { relationship: 'brother', translation: { english: 'brother', spanish: 'hermano', french: 'frère' } },
  { relationship: 'sister', translation: { english: 'sister', spanish: 'hermana', french: 'sœur' } },
  { relationship: 'mother', translation: { english: 'mother', spanish: 'madre', french: 'mère' } },
  { relationship: 'father', translation: { english: 'father', spanish: 'padre', french: 'père' } },
  { relationship: 'son', translation: { english: 'son', spanish: 'hijo', french: 'fils' } },
  { relationship: 'daughter', translation: { english: 'daughter', spanish: 'hija', french: 'fille' } },
  { relationship: 'grandfather', translation: { english: 'grandfather', spanish: 'abuelo', french: 'grand-père' } },
  { relationship: 'grandmother', translation: { english: 'grandmother', spanish: 'abuela', french: 'grand-mère' } },
];

const languages = ['english', 'spanish', 'french'];

const App = () => {
  const [selectedRelationships, setSelectedRelationships] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [result, setResult] = useState('');

  const handleAddRelationship = () => {
    setSelectedRelationships([...selectedRelationships, '']);
  };

  const handleRemoveRelationship = (index: number) => {
    setSelectedRelationships(selectedRelationships.filter((_, i) => i !== index));
  };

  const handleRelationshipChange = (index: number, value: string) => {
    setSelectedRelationships(selectedRelationships.map((relationship, i) => i === index ? value : relationship));
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleSearch = () => {
    const translations = selectedRelationships.map((relationship) => {
      const kinship = kinships.find((kinship) => kinship.relationship === relationship);
      return kinship ? kinship.translation[selectedLanguage] : '';
    });
    setResult(translations.join(' of '));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Family Kinship Translator</h1>
      <p className="text-lg mb-4">How do I call my...</p>
      {selectedRelationships.map((relationship, index) => (
        <div key={index} className="flex items-center mb-2">
          <select
            value={relationship}
            onChange={(e) => handleRelationshipChange(index, e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          >
            <option value="">Select a relationship</option>
            {relationshipOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {index > 0 && (
            <button
              onClick={() => handleRemoveRelationship(index)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        onClick={handleAddRelationship}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Relationship
      </button>
      <select
        value={selectedLanguage}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="w-full p-2 pl-10 text-sm text-gray-700 mb-4"
      >
        {languages.map((language) => (
          <option key={language} value={language}>{language.charAt(0).toUpperCase() + language.slice(1)}</option>
        ))}
      </select>
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Search
      </button>
      {result && (
        <p className="text-lg mb-4">Result: {result}</p>
      )}
    </div>
  );
};

export default App;
```