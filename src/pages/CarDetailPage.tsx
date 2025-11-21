import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCars } from '../context/CarContext';
import { 
  Download, 
  Calendar, 
  Gauge, 
  Zap, 
  Fuel, 
  Battery, 
  Wind,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import CarCard from '../components/CarCard';
import FinanceCalculator from '../components/FinanceCalculator';
import { toast } from 'sonner@2.0.3';

export default function CarDetailPage() {
  const { id } = useParams();
  const { cars } = useCars();
  const car = cars.find(c => c.id === id);
  const [selectedColor, setSelectedColor] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-gray-900 dark:text-white mb-4">
            Car Not Found
          </h1>
          <Link to="/models" className="text-blue-600 hover:underline">
            Back to Models
          </Link>
        </div>
      </div>
    );
  }

  const relatedCars = cars.filter(c => c.category === car.category && c.id !== car.id).slice(0, 3);

  const handleDownloadBrochure = () => {
    toast.success('Brochure download started!');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const rotate360 = () => {
    setRotation(rotation + 90);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-black">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/models" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Models
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-4 py-1 bg-blue-600 text-white rounded-full text-sm">
                {car.category}
              </span>
              {car.comingSoon && (
                <span className="px-4 py-1 bg-yellow-500 text-white rounded-full text-sm">
                  Coming Soon
                </span>
              )}
            </div>
            <h1 className="text-5xl md:text-7xl text-white mb-4">
              {car.name}
            </h1>
            <p className="text-2xl text-blue-200 mb-2">{car.brand} • {car.year}</p>
            <p className="text-4xl text-white">
              Starting at <span className="text-blue-400">${car.price.toLocaleString()}</span>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* 360° Viewer */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl">
              <div className="relative aspect-video mb-6 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                <motion.img
                  key={currentImageIndex}
                  src={car.colors[selectedColor].image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                  style={{ transform: `rotate(${rotation}deg)` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Image Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* 360 Button */}
                <button
                  onClick={rotate360}
                  className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                >
                  360° View
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index
                        ? 'border-blue-600'
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Color Selector */}
              <div>
                <h3 className="text-gray-900 dark:text-white mb-4">
                  Select Color
                </h3>
                <div className="flex flex-wrap gap-3">
                  {car.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedColor(index);
                        setCurrentImageIndex(0);
                      }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedColor === index
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: color.code }}
                      />
                      <span className="text-sm text-gray-900 dark:text-white">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details and CTA */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl mb-6">
              <h2 className="text-2xl text-gray-900 dark:text-white mb-4">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {car.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  to={`/book-test-drive?car=${car.id}`}
                  className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-center flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Test Drive</span>
                </Link>
                <button
                  onClick={handleDownloadBrochure}
                  className="flex-1 px-6 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Brochure</span>
                </button>
              </div>

              <div className="flex justify-center">
                <FinanceCalculator carPrice={car.price} />
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl text-gray-900 dark:text-white mb-6">
                Specifications
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Engine</p>
                    <p className="text-gray-900 dark:text-white">{car.engine}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gauge className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Horsepower</p>
                    <p className="text-gray-900 dark:text-white">{car.horsepower} hp</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Torque</p>
                    <p className="text-gray-900 dark:text-white">{car.torque} Nm</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wind className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">0-100 km/h</p>
                    <p className="text-gray-900 dark:text-white">{car.acceleration}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gauge className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Top Speed</p>
                    <p className="text-gray-900 dark:text-white">{car.topSpeed} km/h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Fuel className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fuel Type</p>
                    <p className="text-gray-900 dark:text-white">{car.fuelType}</p>
                  </div>
                </div>

                {car.range && (
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Range</p>
                      <p className="text-gray-900 dark:text-white">{car.range} km</p>
                    </div>
                  </div>
                )}

                {car.battery && (
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Battery className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Battery</p>
                      <p className="text-gray-900 dark:text-white">{car.battery}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Cars */}
        {relatedCars.length > 0 && (
          <div>
            <h2 className="text-3xl text-gray-900 dark:text-white mb-8">
              Similar Models
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCars.map((relatedCar) => (
                <motion.div
                  key={relatedCar.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <CarCard car={relatedCar} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}