import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Search } from 'lucide-react';
import { Input } from '../components/ui/input';

interface Showroom {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  hours: string;
  image: string;
  coordinates: { lat: number; lng: number };
}

const showrooms: Showroom[] = [
  {
    id: 1,
    name: 'LuxeDrive Beverly Hills',
    address: '123 Luxury Avenue',
    city: 'Beverly Hills',
    state: 'California',
    phone: '+1 (310) 555-0100',
    email: 'beverlyhills@luxedrive.com',
    hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    coordinates: { lat: 34.0736, lng: -118.4004 }
  },
  {
    id: 2,
    name: 'LuxeDrive Manhattan',
    address: '456 Park Avenue',
    city: 'New York',
    state: 'New York',
    phone: '+1 (212) 555-0200',
    email: 'manhattan@luxedrive.com',
    hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    coordinates: { lat: 40.7614, lng: -73.9776 }
  },
  {
    id: 3,
    name: 'LuxeDrive Miami Beach',
    address: '789 Ocean Drive',
    city: 'Miami Beach',
    state: 'Florida',
    phone: '+1 (305) 555-0300',
    email: 'miami@luxedrive.com',
    hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    coordinates: { lat: 25.7907, lng: -80.1300 }
  },
  {
    id: 4,
    name: 'LuxeDrive Chicago',
    address: '321 Michigan Avenue',
    city: 'Chicago',
    state: 'Illinois',
    phone: '+1 (312) 555-0400',
    email: 'chicago@luxedrive.com',
    hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
    coordinates: { lat: 41.8781, lng: -87.6298 }
  },
  {
    id: 5,
    name: 'LuxeDrive San Francisco',
    address: '555 Market Street',
    city: 'San Francisco',
    state: 'California',
    phone: '+1 (415) 555-0500',
    email: 'sanfran@luxedrive.com',
    hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
    coordinates: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: 6,
    name: 'LuxeDrive Dallas',
    address: '888 Commerce Street',
    city: 'Dallas',
    state: 'Texas',
    phone: '+1 (214) 555-0600',
    email: 'dallas@luxedrive.com',
    hours: 'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
    image: 'https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=800',
    coordinates: { lat: 32.7767, lng: -96.7970 }
  }
];

export default function ShowroomPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredShowrooms = showrooms.filter(showroom => {
    const matchesSearch = showroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         showroom.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         showroom.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'all' || showroom.state === selectedState;
    return matchesSearch && matchesState;
  });

  const states = Array.from(new Set(showrooms.map(s => s.state))).sort();

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-black">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl text-white mb-4">
              Our Showrooms
            </h1>
            <p className="text-xl text-blue-100">
              Visit us and experience luxury in person
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by city or state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 mb-8 h-96 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Interactive Map View
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Google Maps integration would appear here
            </p>
          </div>
        </div>

        {/* Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShowrooms.map((showroom, index) => (
            <motion.div
              key={showroom.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-video bg-gray-200 dark:bg-gray-800">
                <img
                  src={showroom.image}
                  alt={showroom.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-gray-900 dark:text-white mb-4">
                  {showroom.name}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-700 dark:text-gray-300">{showroom.address}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {showroom.city}, {showroom.state}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <a href={`tel:${showroom.phone}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                      {showroom.phone}
                    </a>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <a href={`mailto:${showroom.email}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                      {showroom.email}
                    </a>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{showroom.hours}</p>
                  </div>
                </div>

                <button className="w-full mt-6 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Get Directions
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredShowrooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No showrooms found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
