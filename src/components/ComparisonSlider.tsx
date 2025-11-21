import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCars } from '../context/CarContext';

export default function ComparisonSlider() {
  const { cars } = useCars();
  const [selectedCars, setSelectedCars] = useState<string[]>([]);

  const toggleCar = (carId: string) => {
    if (selectedCars.includes(carId)) {
      setSelectedCars(selectedCars.filter(id => id !== carId));
    } else if (selectedCars.length < 3) {
      setSelectedCars([...selectedCars, carId]);
    }
  };

  const compareCars = cars.filter(car => selectedCars.includes(car.id));

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Compare Models
          </h2>
          <p className="text-xl text-gray-300">
            Select up to 3 cars to compare side by side
          </p>
        </motion.div>

        {/* Car Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {cars.slice(0, 6).map((car) => (
            <motion.button
              key={car.id}
              onClick={() => toggleCar(car.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                selectedCars.includes(car.id)
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              }`}
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full aspect-video object-cover rounded-lg mb-2"
              />
              <p className="text-white text-sm">{car.name}</p>
              {selectedCars.includes(car.id) && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">
                    {selectedCars.indexOf(car.id) + 1}
                  </span>
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Comparison Table */}
        <AnimatePresence>
          {compareCars.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-900 dark:text-white">
                        Specification
                      </th>
                      {compareCars.map((car) => (
                        <th key={car.id} className="px-6 py-4 text-left">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-900 dark:text-white">{car.name}</span>
                            <button
                              onClick={() => toggleCar(car.id)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Price</td>
                      {compareCars.map((car) => (
                        <td key={car.id} className="px-6 py-4 text-gray-900 dark:text-white">
                          ${car.price.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Horsepower</td>
                      {compareCars.map((car) => (
                        <td key={car.id} className="px-6 py-4 text-gray-900 dark:text-white">
                          {car.horsepower} hp
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">0-100 km/h</td>
                      {compareCars.map((car) => (
                        <td key={car.id} className="px-6 py-4 text-gray-900 dark:text-white">
                          {car.acceleration}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Top Speed</td>
                      {compareCars.map((car) => (
                        <td key={car.id} className="px-6 py-4 text-gray-900 dark:text-white">
                          {car.topSpeed} km/h
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Fuel Type</td>
                      {compareCars.map((car) => (
                        <td key={car.id} className="px-6 py-4 text-gray-900 dark:text-white">
                          {car.fuelType}
                        </td>
                      ))}
                    </tr>
                    {compareCars.some(car => car.range) && (
                      <tr>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Range</td>
                        {compareCars.map((car) => (
                          <td key={car.id} className="px-6 py-4 text-gray-900 dark:text-white">
                            {car.range ? `${car.range} km` : 'N/A'}
                          </td>
                        ))}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
