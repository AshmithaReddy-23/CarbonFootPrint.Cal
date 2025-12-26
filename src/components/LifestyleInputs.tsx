import { Leaf, ShoppingBag, Recycle } from 'lucide-react';

interface LifestyleInputsProps {
  dietType: string;
  shoppingHabits: string;
  recycling: string;
  onChange: (field: string, value: string | number) => void;
}

export default function LifestyleInputs({
  dietType,
  shoppingHabits,
  recycling,
  onChange,
}: LifestyleInputsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <Leaf className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Lifestyle</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Diet Type
          </label>
          <select
            value={dietType}
            onChange={(e) => onChange('dietType', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300 cursor-pointer bg-white"
          >
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="mixed">Mixed (Moderate Meat)</option>
            <option value="heavyMeat">Heavy Meat Consumer</option>
          </select>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Animal agriculture has a significant carbon footprint
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-pink-100 rounded">
                <ShoppingBag className="w-4 h-4 text-pink-600" />
              </div>
              <span>Shopping Habits</span>
            </div>
          </label>
          <select
            value={shoppingHabits}
            onChange={(e) => onChange('shoppingHabits', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300 cursor-pointer bg-white"
          >
            <option value="low">Low (Minimal purchases, second-hand)</option>
            <option value="moderate">Moderate (Regular shopping)</option>
            <option value="high">High (Frequent new purchases)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-teal-100 rounded">
                <Recycle className="w-4 h-4 text-teal-600" />
              </div>
              <span>Do You Recycle?</span>
            </div>
          </label>
          <div className="flex gap-6">
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                value="yes"
                checked={recycling === 'yes'}
                onChange={(e) => onChange('recycling', e.target.value)}
                className="w-5 h-5 text-green-600 cursor-pointer"
              />
              <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                Yes
              </span>
            </label>
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                value="no"
                checked={recycling === 'no'}
                onChange={(e) => onChange('recycling', e.target.value)}
                className="w-5 h-5 text-gray-400 cursor-pointer"
              />
              <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-600 transition-colors">
                No
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
