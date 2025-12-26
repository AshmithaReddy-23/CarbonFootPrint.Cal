import { TrendingUp, Award, AlertCircle, Lightbulb } from 'lucide-react';
import { EmissionResults } from '../utils/calculations';
import { GLOBAL_AVERAGE, THRESHOLDS } from '../constants/emissionFactors';

interface ResultsDisplayProps {
  results: EmissionResults;
  classification: 'low' | 'average' | 'high';
  tips: string[];
}

export default function ResultsDisplay({
  results,
  classification,
  tips,
}: ResultsDisplayProps) {
  const categories = [
    {
      name: 'Transportation',
      value: results.transportation,
      color: 'bg-blue-500',
    },
    { name: 'Energy', value: results.energy, color: 'bg-yellow-500' },
    { name: 'Lifestyle', value: results.lifestyle, color: 'bg-green-500' },
  ];

  const maxValue = Math.max(...categories.map((c) => c.value));

  const classificationConfig = {
    low: {
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      title: 'Low Carbon Footprint',
      message: 'Excellent! Your footprint is below average.',
    },
    average: {
      icon: TrendingUp,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      title: 'Average Carbon Footprint',
      message: 'You\'re around average. There\'s room for improvement!',
    },
    high: {
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      title: 'High Carbon Footprint',
      message: 'Consider making changes to reduce your impact.',
    },
  };

  const config = classificationConfig[classification];
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Results</h2>

        <div className="mb-6">
          <div className="text-center mb-4">
            <p className="text-5xl font-bold text-gray-900">
              {results.total.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              kg CO₂ per year
            </p>
          </div>

          <div
            className={`flex items-center gap-3 p-4 rounded-lg border ${config.bgColor} ${config.borderColor}`}
          >
            <Icon className={`w-6 h-6 ${config.color}`} />
            <div>
              <p className={`font-semibold ${config.color}`}>{config.title}</p>
              <p className="text-sm text-gray-600">{config.message}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Emissions by Category
          </h3>

          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">
                    {category.name}
                  </span>
                  <span className="text-gray-600">
                    {category.value.toLocaleString()} kg CO₂
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${category.color} h-3 rounded-full transition-all duration-500`}
                    style={{
                      width: `${(category.value / maxValue) * 100}%`,
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {((category.value / results.total) * 100).toFixed(1)}% of
                  total
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Detailed Breakdown
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Car:</span>
              <span className="font-medium">
                {results.breakdown.car.toLocaleString()} kg
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Public Transport:</span>
              <span className="font-medium">
                {results.breakdown.publicTransport.toLocaleString()} kg
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Flights:</span>
              <span className="font-medium">
                {results.breakdown.flights.toLocaleString()} kg
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Electricity:</span>
              <span className="font-medium">
                {results.breakdown.electricity.toLocaleString()} kg
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cooking:</span>
              <span className="font-medium">
                {results.breakdown.cooking.toLocaleString()} kg
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Diet:</span>
              <span className="font-medium">
                {results.breakdown.diet.toLocaleString()} kg
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shopping:</span>
              <span className="font-medium">
                {results.breakdown.shopping.toLocaleString()} kg
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Recycling Impact:</span>
              <span className="font-medium">
                {results.breakdown.recycling.toLocaleString()} kg
              </span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Global Average:</span>
            <span className="font-medium">
              {GLOBAL_AVERAGE.toLocaleString()} kg CO₂/year
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Your footprint vs. global average:</span>
            <span
              className={`font-medium ${
                results.total > GLOBAL_AVERAGE
                  ? 'text-red-600'
                  : 'text-green-600'
              }`}
            >
              {((results.total / GLOBAL_AVERAGE) * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Personalized Tips
          </h3>
        </div>

        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="flex gap-3">
              <span className="text-yellow-600 font-bold">•</span>
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Remember:</span> Every small change
            makes a difference. Start with one or two actions and build from
            there. You're taking an important step by measuring your impact!
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Understanding the Thresholds
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>
              <strong>Low:</strong> Below {THRESHOLDS.low.toLocaleString()} kg
              CO₂/year
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span>
              <strong>Average:</strong>{' '}
              {THRESHOLDS.low.toLocaleString()}-
              {THRESHOLDS.average.toLocaleString()} kg CO₂/year
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>
              <strong>High:</strong> Above {THRESHOLDS.average.toLocaleString()}{' '}
              kg CO₂/year
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
