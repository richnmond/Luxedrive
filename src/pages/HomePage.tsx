import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCars } from '../context/CarContext';
import { ArrowRight, Zap, Shield, Award, ChevronRight } from 'lucide-react';
import CarCard from '../components/CarCard';
import ComparisonSlider from '../components/ComparisonSlider';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

export default function HomePage() {
  const { cars } = useCars();
  const featuredCar = cars.find(car => car.id === '1');
  const featuredCars = cars.filter(car => car.featured && !car.comingSoon).slice(0, 3);
  const categories = ['SUV', 'Sedan', 'Electric', 'Sports'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-blue-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={featuredCar?.image}
            alt="Featured Car"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl text-white mb-6">
                The Future of
                <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Luxury Driving
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Experience unparalleled performance and cutting-edge technology in every journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/models"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>Explore Models</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/book-test-drive"
                  className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black rounded-lg transition-all transform hover:scale-105"
                >
                  Book Test Drive
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <img
                src={featuredCar?.image}
                alt="Featured Car"
                className="w-full h-auto drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl text-gray-900 dark:text-white mb-2">
                Electric Power
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Experience instant torque and zero emissions with our cutting-edge electric technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl text-gray-900 dark:text-white mb-2">
                Advanced Safety
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our vehicles feature the latest safety technology to protect you and your loved ones.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl text-gray-900 dark:text-white mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every detail is crafted with precision to deliver an unmatched luxury experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Explore Models Section */}
      <section className="py-20 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
              Explore Our Models
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Find the perfect vehicle for your lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/models"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-105"
            >
              <span>View All Models</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
              Car Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Choose from our diverse lineup
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const categoryImage = cars.find(car => car.category === category)?.image;
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/models?category=${category}`}
                    className="group relative block aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
                  >
                    <img
                      src={categoryImage}
                      alt={category}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl text-white group-hover:text-blue-400 transition-colors">
                        {category}
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">
                        {cars.filter(car => car.category === category).length} Models
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Slider */}
      <ComparisonSlider />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
