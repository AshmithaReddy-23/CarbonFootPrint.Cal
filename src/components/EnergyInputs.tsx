import { Zap, Flame } from 'lucide-react';

interface EnergyInputsProps {
  electricityUsage: number;
  cookingFuel: string;
  onChange: (field: string, value: string | number) => void;
}

export default function EnergyInputs({
  electricityUsage,
  cookingFuel,
  onChange,
}: EnergyInputsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Zap className="w-6 h-6 text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Energy Usage</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Monthly Electricity Consumption (kWh)
          </label>
          <input
            type="number"
            min="0"
            value={electricityUsage}
            onChange={(e) =>
              onChange('electricityUsage', Number(e.target.value))
            }
            placeholder="e.g., 200"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all hover:border-gray-300"
          />
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Check your electricity bill for this information
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-orange-100 rounded">
                <Flame className="w-4 h-4 text-orange-600" />
              </div>
              <span>Cooking Fuel Type</span>
            </div>
          </label>
          <select
            value={cookingFuel}
            onChange={(e) => onChange('cookingFuel', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all hover:border-gray-300 cursor-pointer bg-white"
          >
            <option value="electricity">Electricity</option>
            <option value="lpg">LPG / Natural Gas</option>
            <option value="biomass">Biomass / Wood</option>
          </select>
        </div>
      </div>
    </div>
  );
}
