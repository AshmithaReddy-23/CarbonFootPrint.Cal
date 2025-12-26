import { Car, Plane, Bus, Train } from 'lucide-react';

interface TransportationInputsProps {
  carType: string;
  carDistance: number;
  busDistance: number;
  trainDistance: number;
  metroDistance: number;
  shortFlights: number;
  mediumFlights: number;
  longFlights: number;
  onChange: (field: string, value: string | number) => void;
}

export default function TransportationInputs({
  carType,
  carDistance,
  busDistance,
  trainDistance,
  metroDistance,
  shortFlights,
  mediumFlights,
  longFlights,
  onChange,
}: TransportationInputsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Car className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Transportation</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Car Type
          </label>
          <select
            value={carType}
            onChange={(e) => onChange('carType', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300 cursor-pointer bg-white"
          >
            <option value="none">No Car / Don't Use Car</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {carType !== 'none' && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Average Distance Traveled by Car (km/week)
            </label>
            <input
              type="number"
              min="0"
              value={carDistance}
              onChange={(e) => onChange('carDistance', Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        )}

        <div className="border-t-2 border-gray-200 pt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Bus className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-700">
              Public Transport (km/week)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                Bus
              </label>
              <input
                type="number"
                min="0"
                value={busDistance}
                onChange={(e) =>
                  onChange('busDistance', Number(e.target.value))
                }
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                Train
              </label>
              <input
                type="number"
                min="0"
                value={trainDistance}
                onChange={(e) =>
                  onChange('trainDistance', Number(e.target.value))
                }
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                Metro
              </label>
              <input
                type="number"
                min="0"
                value={metroDistance}
                onChange={(e) =>
                  onChange('metroDistance', Number(e.target.value))
                }
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:border-gray-300"
              />
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gray-200 pt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-sky-100 rounded-lg">
              <Plane className="w-5 h-5 text-sky-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-700">
              Flights per Year
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                Short-haul <span className="text-gray-400">(&lt;1500km)</span>
              </label>
              <input
                type="number"
                min="0"
                value={shortFlights}
                onChange={(e) =>
                  onChange('shortFlights', Number(e.target.value))
                }
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all hover:border-gray-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                Medium-haul <span className="text-gray-400">(1500-3000km)</span>
              </label>
              <input
                type="number"
                min="0"
                value={mediumFlights}
                onChange={(e) =>
                  onChange('mediumFlights', Number(e.target.value))
                }
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all hover:border-gray-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                Long-haul <span className="text-gray-400">(&gt;3000km)</span>
              </label>
              <input
                type="number"
                min="0"
                value={longFlights}
                onChange={(e) =>
                  onChange('longFlights', Number(e.target.value))
                }
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all hover:border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
