import { ArrowLeft, TrendingUp, Award, AlertCircle, Lightbulb } from 'lucide-react';
import { EmissionResults } from '../utils/calculations';
import { GLOBAL_AVERAGE, THRESHOLDS } from '../constants/emissionFactors';

interface ResultsPageProps {
  results: EmissionResults;
  classification: 'low' | 'average' | 'high';
  tips: string[];
  onBack: () => void;
}

export default function ResultsPage({
  results,
  classification,
  tips,
  onBack,
}: ResultsPageProps) {
  const categories = [
    {
      name: 'Transportation',
      value: results.transportation,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-100',
    },
    {
      name: 'Energy',
      value: results.energy,
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-100',
    },
    {
      name: 'Lifestyle',
      value: results.lifestyle,
      color: 'bg-green-500',
      lightColor: 'bg-green-100',
    },
  ];

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

  const maxValue = Math.max(...categories.map((c) => c.value));
  const sortedCategories = [...categories].sort((a, b) => b.value - a.value);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Calculator
        </button>

        <div className="mb-10 animate-fade-in">
          <div className="text-center mb-6">
            <p className="text-6xl md:text-7xl font-bold text-gray-900">
              {results.total.toLocaleString()}
            </p>
            <p className="text-lg text-gray-600 mt-2">kg CO₂ per year</p>
          </div>

          <div
            className={`flex items-center gap-4 p-6 rounded-xl border-2 ${config.bgColor} ${config.borderColor} mx-auto max-w-md animate-slide-up`}
          >
            <Icon className={`w-8 h-8 ${config.color} flex-shrink-0`} />
            <div>
              <p className={`text-lg font-bold ${config.color}`}>
                {config.title}
              </p>
              <p className="text-sm text-gray-600">{config.message}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Emissions by Category
            </h2>

            <div className="space-y-6">
              {sortedCategories.map((category) => (
                <div key={category.name} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full ${category.color}`}
                      />
                      <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-600">
                      {category.value.toLocaleString()} kg
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`${category.color} h-4 rounded-full transition-all duration-700`}
                      style={{
                        width: `${(category.value / maxValue) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {((category.value / results.total) * 100).toFixed(1)}% of
                    total
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-gray-600 mb-3">
                Global Average: <strong>{GLOBAL_AVERAGE.toLocaleString()}</strong> kg CO₂/year
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                    style={{
                      width: `${Math.min(
                        (results.total / (GLOBAL_AVERAGE * 2)) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">
                  {((results.total / GLOBAL_AVERAGE) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Detailed Breakdown
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-600">Transportation</span>
                <span className="font-semibold text-blue-600">
                  {results.breakdown.car.toLocaleString()} kg
                </span>
              </div>

              <div className="flex justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-600">Public Transport</span>
                <span className="font-semibold text-blue-600">
                  {results.breakdown.publicTransport.toLocaleString()} kg
                </span>
              </div>

              <div className="flex justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-600">Flights</span>
                <span className="font-semibold text-sky-600">
                  {results.breakdown.flights.toLocaleString()} kg
                </span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-600">Electricity</span>
                <span className="font-semibold text-yellow-600">
                  {results.breakdown.electricity.toLocaleString()} kg
                </span>
              </div>

              <div className="flex justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-600">Cooking</span>
                <span className="font-semibold text-yellow-600">
                  {results.breakdown.cooking.toLocaleString()} kg
                </span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-600">Diet</span>
                <span className="font-semibold text-green-600">
                  {results.breakdown.diet.toLocaleString()} kg
                </span>
              </div>

              <div className="flex justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-600">Shopping</span>
                <span className="font-semibold text-green-600">
                  {results.breakdown.shopping.toLocaleString()} kg
                </span>
              </div>

              <div className="flex justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-600">Recycling Impact</span>
                <span
                  className={`font-semibold ${
                    results.breakdown.recycling < 0
                      ? 'text-green-600'
                      : 'text-gray-600'
                  }`}
                >
                  {results.breakdown.recycling > 0 ? '+' : ''}
                  {results.breakdown.recycling.toLocaleString()} kg
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-800">
              Your Personalized Tips
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-3">
                  <span className="text-2xl text-yellow-500 font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{tip}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-bold text-blue-700">Small changes, big impact:</span> Start with one or two actions from above. Small, consistent changes add up to significant environmental benefits over time. Remember, you're already ahead by measuring your footprint!
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 animate-slide-up" style={{animationDelay: '0.3s'}}>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Understanding the Thresholds
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-green-50 border-l-4 border-green-500">
              <p className="font-bold text-green-700">Low</p>
              <p className="text-sm text-gray-600 mt-1">
                Below {THRESHOLDS.low.toLocaleString()} kg CO₂/year
              </p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50 border-l-4 border-yellow-500">
              <p className="font-bold text-yellow-700">Average</p>
              <p className="text-sm text-gray-600 mt-1">
                {THRESHOLDS.low.toLocaleString()}-
                {THRESHOLDS.average.toLocaleString()} kg CO₂/year
              </p>
            </div>
            <div className="p-4 rounded-lg bg-red-50 border-l-4 border-red-500">
              <p className="font-bold text-red-700">High</p>
              <p className="text-sm text-gray-600 mt-1">
                Above {THRESHOLDS.average.toLocaleString()} kg CO₂/year
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
