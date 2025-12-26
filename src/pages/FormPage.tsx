import { Calculator, RotateCcw, Leaf } from 'lucide-react';
import TransportationInputs from '../components/TransportationInputs';
import EnergyInputs from '../components/EnergyInputs';
import LifestyleInputs from '../components/LifestyleInputs';
import { UserInputs } from '../utils/calculations';

interface FormPageProps {
  inputs: UserInputs;
  onInputChange: (field: string, value: string | number) => void;
  onCalculate: () => void;
  onReset: () => void;
}

export default function FormPage({
  inputs,
  onInputChange,
  onCalculate,
  onReset,
}: FormPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20" />
              <Leaf className="w-12 h-12 text-green-600 relative" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Carbon Footprint
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-4">
            Calculator
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover your annual CO₂ emissions and learn how to reduce your
            environmental impact. Every small change counts toward a
            sustainable future.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="space-y-6 animate-slide-up">
              <TransportationInputs
                carType={inputs.carType}
                carDistance={inputs.carDistance}
                busDistance={inputs.busDistance}
                trainDistance={inputs.trainDistance}
                metroDistance={inputs.metroDistance}
                shortFlights={inputs.shortFlights}
                mediumFlights={inputs.mediumFlights}
                longFlights={inputs.longFlights}
                onChange={onInputChange}
              />

              <EnergyInputs
                electricityUsage={inputs.electricityUsage}
                cookingFuel={inputs.cookingFuel}
                onChange={onInputChange}
              />

              <LifestyleInputs
                dietType={inputs.dietType}
                shoppingHabits={inputs.shoppingHabits}
                recycling={inputs.recycling}
                onChange={onInputChange}
              />

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={onCalculate}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate Footprint
                </button>

                <button
                  onClick={onReset}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 transform"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-xl shadow-lg p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" />
                Quick Guide
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-green-600 font-bold">1.</span>
                  <span>
                    Fill in your transportation habits (car, public transport, flights)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 font-bold">2.</span>
                  <span>
                    Enter your monthly electricity usage and cooking fuel type
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 font-bold">3.</span>
                  <span>
                    Share your lifestyle choices (diet, shopping, recycling)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 font-bold">4.</span>
                  <span>
                    Click "Calculate" to see your personalized results
                  </span>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <span className="font-semibold text-green-700">Tip:</span> All values are based on average annual emissions. Your actual footprint may vary based on regional factors.
                </p>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <span className="font-semibold text-blue-700">Fun fact:</span> The average person can offset 1 ton of CO₂ by planting ~17 trees!
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center text-sm text-gray-600 py-8">
          <p className="leading-relaxed">
            Emission factors are based on international research and average values.
            <br />
            Results are estimates for educational purposes.
          </p>
        </footer>
      </div>
    </div>
  );
}
