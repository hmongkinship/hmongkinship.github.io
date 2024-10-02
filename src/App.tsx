import React from 'react';
import logo from './logo.svg';
import './App.css';

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
  { relationship: 'brother', translation: 'Hmong Brother' },
  { relationship: 'sister', translation: 'Hmong Sister' },
  { relationship: 'mother', translation: 'Hmong Mother' },
  { relationship: 'father', translation: 'Hmong Father' },
  { relationship: 'son', translation: 'Hmong Son' },
  { relationship: 'daughter', translation: 'Hmong Daughter' },
  { relationship: 'grandfather', translation: 'Hmong Grandfather' },
  { relationship: 'grandmother', translation: 'Hmong Grandmother' },
];

const App = () => {
  const [selectedRelationships, setSelectedRelationships] = React.useState<string[]>([]);
  const [result, setResult] = React.useState('');

  const handleAddRelationship = () => {
    setSelectedRelationships([...selectedRelationships, '']);
  };

  const handleRemoveRelationship = (index: number) => {
    setSelectedRelationships(selectedRelationships.filter((_, i) => i !== index));
  };

  const handleRelationshipChange = (index: number, value: string) => {
    setSelectedRelationships(selectedRelationships.map((relationship, i) => i === index ? value : relationship));
  };

  const handleSearch = () => {
    const translations = selectedRelationships.map((relationship) => {
      const kinship = kinships.find((kinship) => kinship.relationship === relationship);
      return kinship ? kinship.translation : '';
    });
    setResult(translations.join(' of '));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Hmong Kinship</h1>
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