import React from 'react';
import logo from './logo.svg';
import './App.css';

interface Translation {
  male: string;
  female: string;
}

interface Kinship {
  relationship: string;
  translation: Translation;
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
  { relationship: 'brother', translation: { male: 'Hmong-Brother-Male', female: 'Hmong-Brother-Female'} },
  { relationship: 'sister', translation: { male: 'Hmong-Sister-Male', female: 'Hmong-Sister-Female'}},
  { relationship: 'mother', translation: { male: 'Hmong-Mother-Male', female: 'Hmong-Mother-Female'}},
  { relationship: 'father', translation: { male: 'Hmong-Father-Male', female: 'Hmong-Father-Female'}},
  { relationship: 'son', translation: { male: 'Hmong-Son-Male', female: 'Hmong-Son-Female'}},
  { relationship: 'daughter', translation: { male: 'Hmong-Daughter-Male', female: 'Hmong-Daughter-Female'}},
  { relationship: 'grandfather', translation: { male: 'Hmong-Grandfather-Male', female: 'Hmong-Grandfather-Female'}},
  { relationship: 'grandmother', translation: { male: 'Hmong-Grandmother-Male', female: 'Hmong-Grandmother-Female'}},
];

const gender = ['male', 'female'];

const App = () => {
  const [selectedRelationships, setSelectedRelationships] = React.useState<string[]>([]);
  const [selectedGender, setSelectedGender] = React.useState('male');
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

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
    // When the gender change, the result should change automatically - if appropriate.
    // Actual: Although calling the handleSearch() works, it does not work until you change the gender a few times.
    // Expected: It should change the result right away.
    // handleSearch();
  };

  const handleSearch = () => {
    const translations = selectedRelationships.map((relationship) => {
      const kinship = kinships.find((kinship) => kinship.relationship === relationship);
      if ( selectedGender == "male") {
        return kinship?.translation.male
      } else {
        return kinship?.translation.female
      }
    });
    setResult(translations.join(' of '));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Hmong Kinship</h1>
      <p className="text-lg mb-4">I am a...</p>
      <select
        value={selectedGender}
        onChange={(e) => handleGenderChange(e.target.value)}
        className="w-full p-2 pl-10 text-sm text-gray-700 mb-4"
      >
        {gender.map((gender) => (
          <option key={gender} value={gender}>{gender.charAt(0).toUpperCase() + gender.slice(1)}</option>
        ))}
      </select>
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
          {index >= 0 && (
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