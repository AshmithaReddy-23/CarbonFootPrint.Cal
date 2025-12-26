import { useState } from 'react';
import FormPage from './pages/FormPage';
import ResultsPage from './pages/ResultsPage';
import {
  calculateEmissions,
  getFootprintClassification,
  getReductionTips,
  UserInputs,
  EmissionResults,
} from './utils/calculations';

const initialInputs: UserInputs = {
  carType: 'none',
  carDistance: 0,
  busDistance: 0,
  trainDistance: 0,
  metroDistance: 0,
  shortFlights: 0,
  mediumFlights: 0,
  longFlights: 0,
  electricityUsage: 200,
  cookingFuel: 'electricity',
  dietType: 'mixed',
  shoppingHabits: 'moderate',
  recycling: 'yes',
};

function App() {
  const [inputs, setInputs] = useState<UserInputs>(initialInputs);
  const [submittedInputs, setSubmittedInputs] = useState<UserInputs | null>(null);
  const [results, setResults] = useState<EmissionResults | null>(null);
  const [currentPage, setCurrentPage] = useState<'form' | 'results'>('form');

  const handleInputChange = (field: string, value: string | number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCalculate = () => {
    const frozenInputs = { ...inputs };   // 🔒 snapshot
    setSubmittedInputs(frozenInputs);

    const calculatedResults = calculateEmissions(frozenInputs);
    setResults(calculatedResults);

    setCurrentPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setInputs(initialInputs);
    setSubmittedInputs(null);
    setResults(null);
    setCurrentPage('form');
  };

  const handleBackToForm = () => {
    setCurrentPage('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const classification = results
    ? getFootprintClassification(results.total)
    : 'average';

  const tips = results ? getReductionTips(results) : [];

  return (
    <>
      {currentPage === 'form' ? (
        <FormPage
          inputs={inputs}
          onInputChange={handleInputChange}
          onCalculate={handleCalculate}
          onReset={handleReset}
        />
      ) : (
        <ResultsPage
          results={results!}
          classification={classification}
          tips={tips}
          onBack={handleBackToForm}
        />
      )}
    </>
  );
}

export default App;