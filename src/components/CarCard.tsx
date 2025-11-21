import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Zap, Fuel, Gauge, ArrowRight } from 'lucide-react';
import { Car } from '../context/CarContext';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-800"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {car.comingSoon && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
            Coming Soon
          </div>
        )}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
          {car.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl text-gray-900 dark:text-white mb-1">
            {car.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{car.year}</p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Power</p>
              <p className="text-sm text-gray-900 dark:text-white">{car.horsepower}hp</p>
            </div>
          </div>
          {car.fuelType === 'Electric' ? (
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Range</p>
                <p className="text-sm text-gray-900 dark:text-white">{car.range}km</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Fuel className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Fuel</p>
                <p className="text-sm text-gray-900 dark:text-white">{car.fuelType}</p>
              </div>
            </div>
          )}
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">0-100</p>
            <p className="text-sm text-gray-900 dark:text-white">{car.acceleration}</p>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Starting at</p>
            <p className="text-2xl text-blue-600">
              ${car.price.toLocaleString()}
            </p>
          </div>
          <Link
            to={`/car/${car.id}`}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center space-x-2 group"
          >
            <span>View</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
