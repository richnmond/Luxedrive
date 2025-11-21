import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Car, User, Mail, Phone, MapPin } from 'lucide-react';
import { useCars } from '../context/CarContext';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner@2.0.3';

export default function BookTestDrivePage() {
  const [searchParams] = useSearchParams();
  const { cars, addBooking } = useCars();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carId: searchParams.get('car') || '',
    date: '',
    time: '',
    location: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const selectedCar = cars.find(car => car.id === formData.carId);
    
    // Simulate API call
    setTimeout(() => {
      addBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        carId: formData.carId,
        carName: selectedCar?.name || '',
        date: `${formData.date} ${formData.time}`
      });
      
      toast.success('Test drive booked successfully! We will send you a confirmation email shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        carId: '',
        date: '',
        time: '',
        location: ''
      });
      setLoading(false);
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
              Book a Test Drive
            </h1>
            <p className="text-xl text-blue-100">
              Experience luxury firsthand - schedule your test drive today
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="pl-10"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    className="pl-10"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                    className="pl-10"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="car">Select Model *</Label>
                <div className="relative mt-2">
                  <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <Select value={formData.carId} onValueChange={(value) => handleChange('carId', value)}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Choose a car" />
                    </SelectTrigger>
                    <SelectContent>
                      {cars.filter(car => !car.comingSoon).map(car => (
                        <SelectItem key={car.id} value={car.id}>
                          {car.name} - ${car.price.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Preferred Showroom *</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <Select value={formData.location} onValueChange={(value) => handleChange('location', value)}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Choose a location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beverly-hills">LuxeDrive Beverly Hills</SelectItem>
                      <SelectItem value="manhattan">LuxeDrive Manhattan</SelectItem>
                      <SelectItem value="miami">LuxeDrive Miami Beach</SelectItem>
                      <SelectItem value="chicago">LuxeDrive Chicago</SelectItem>
                      <SelectItem value="sf">LuxeDrive San Francisco</SelectItem>
                      <SelectItem value="dallas">LuxeDrive Dallas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Preferred Date *</Label>
                  <div className="relative mt-2">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      required
                      className="pl-10"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="time">Preferred Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Booking...' : 'Book Test Drive'}
              </button>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                By submitting this form, you agree to our terms and privacy policy.
              </p>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <h2 className="text-2xl mb-4">What to Expect</h2>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm">1</span>
                  </div>
                  <div>
                    <p className="text-white">Confirmation Email</p>
                    <p className="text-blue-100 text-sm">You'll receive a confirmation within 24 hours</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm">2</span>
                  </div>
                  <div>
                    <p className="text-white">Personal Consultation</p>
                    <p className="text-blue-100 text-sm">Meet with our expert team</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm">3</span>
                  </div>
                  <div>
                    <p className="text-white">Test Drive</p>
                    <p className="text-blue-100 text-sm">Experience the car for 30-60 minutes</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm">4</span>
                  </div>
                  <div>
                    <p className="text-white">No Pressure</p>
                    <p className="text-blue-100 text-sm">Take your time to make the right decision</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
              <h3 className="text-xl text-gray-900 dark:text-white mb-4">
                Need Help?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our team is here to assist you with any questions.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <a href="tel:+18001234567" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                    +1 (800) 123-4567
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <a href="mailto:testdrive@luxedrive.com" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                    testdrive@luxedrive.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
