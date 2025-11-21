import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Car, 
  Calendar, 
  Users, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2,
  Check,
  X,
  BarChart3,
  Eye
} from 'lucide-react';
import { useCars, Car as CarType, Booking } from '../context/CarContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner@2.0.3';

type Tab = 'dashboard' | 'cars' | 'bookings' | 'analytics';

export default function AdminDashboard() {
  const { cars, bookings, addCar, updateCar, deleteCar, updateBookingStatus, deleteBooking } = useCars();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showCarModal, setShowCarModal] = useState(false);
  const [editingCar, setEditingCar] = useState<CarType | null>(null);
  const [carFormData, setCarFormData] = useState<Partial<CarType>>({
    name: '',
    brand: 'LuxeDrive',
    category: 'Electric',
    year: 2024,
    price: 0,
    image: '',
    images: [],
    horsepower: 0,
    torque: 0,
    engine: '',
    acceleration: '',
    topSpeed: 0,
    fuelType: 'Electric',
    description: '',
    colors: [],
    featured: false,
    comingSoon: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCar) {
      updateCar(editingCar.id, { ...editingCar, ...carFormData } as CarType);
      toast.success('Car updated successfully!');
    } else {
      const newCar: CarType = {
        id: Date.now().toString(),
        ...carFormData as any,
        images: carFormData.image ? [carFormData.image, carFormData.image, carFormData.image] : [],
        colors: carFormData.image ? [
          { name: 'Default', code: '#000000', image: carFormData.image }
        ] : []
      };
      addCar(newCar);
      toast.success('Car added successfully!');
    }
    
    setShowCarModal(false);
    setEditingCar(null);
    resetCarForm();
  };

  const resetCarForm = () => {
    setCarFormData({
      name: '',
      brand: 'LuxeDrive',
      category: 'Electric',
      year: 2024,
      price: 0,
      image: '',
      images: [],
      horsepower: 0,
      torque: 0,
      engine: '',
      acceleration: '',
      topSpeed: 0,
      fuelType: 'Electric',
      description: '',
      colors: [],
      featured: false,
      comingSoon: false
    });
  };

  const handleEditCar = (car: CarType) => {
    setEditingCar(car);
    setCarFormData(car);
    setShowCarModal(true);
  };

  const handleDeleteCar = (id: string) => {
    if (confirm('Are you sure you want to delete this car?')) {
      deleteCar(id);
      toast.success('Car deleted successfully!');
    }
  };

  const handleUpdateBookingStatus = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    updateBookingStatus(id, status);
    toast.success(`Booking ${status}!`);
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      deleteBooking(id);
      toast.success('Booking deleted successfully!');
    }
  };

  const stats = {
    totalCars: cars.length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    popularCar: cars.reduce((prev, current) => 
      (bookings.filter(b => b.carId === current.id).length > bookings.filter(b => b.carId === prev.id).length) 
        ? current 
        : prev
    , cars[0])?.name || 'N/A'
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your car inventory, bookings, and analytics
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-gray-900 p-2 rounded-xl shadow-lg">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'cars', label: 'Cars', icon: Car },
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Car className="w-8 h-8" />
                  <span className="text-3xl">{stats.totalCars}</span>
                </div>
                <p className="text-blue-100">Total Cars</p>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-8 h-8" />
                  <span className="text-3xl">{stats.totalBookings}</span>
                </div>
                <p className="text-green-100">Total Bookings</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8" />
                  <span className="text-3xl">{stats.pendingBookings}</span>
                </div>
                <p className="text-yellow-100">Pending Bookings</p>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8" />
                  <span className="text-xl truncate">{stats.popularCar}</span>
                </div>
                <p className="text-purple-100">Most Popular</p>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl text-gray-900 dark:text-white mb-6">
                Recent Bookings
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Customer</th>
                      <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Car</th>
                      <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Date</th>
                      <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {bookings.slice(0, 5).map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{booking.name}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{booking.carName}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                          {new Date(booking.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            booking.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            booking.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Cars Tab */}
        {activeTab === 'cars' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-gray-900 dark:text-white">
                Manage Cars
              </h2>
              <button
                onClick={() => {
                  resetCarForm();
                  setEditingCar(null);
                  setShowCarModal(true);
                }}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Car</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div key={car.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
                  <img src={car.image} alt={car.name} className="w-full aspect-video object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl text-gray-900 dark:text-white mb-2">
                      {car.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      ${car.price.toLocaleString()}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCar(car)}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car.id)}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl text-gray-900 dark:text-white mb-6">
              Manage Bookings
            </h2>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Customer</th>
                      <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Email</th>
                      <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Phone</th>
                      <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Car</th>
                      <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Date</th>
                      <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Status</th>
                      <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{booking.name}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{booking.email}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{booking.phone}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{booking.carName}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                          {new Date(booking.date).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            booking.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            booking.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            {booking.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleUpdateBookingStatus(booking.id, 'approved')}
                                  className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                  title="Approve"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleUpdateBookingStatus(booking.id, 'rejected')}
                                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                  title="Reject"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl text-gray-900 dark:text-white mb-6">
              Analytics & Insights
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Distribution */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl text-gray-900 dark:text-white mb-4">
                  Cars by Category
                </h3>
                <div className="space-y-4">
                  {['Electric', 'Sports', 'SUV', 'Sedan'].map((category) => {
                    const count = cars.filter(car => car.category === category).length;
                    const percentage = (count / cars.length) * 100;
                    return (
                      <div key={category}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700 dark:text-gray-300">{category}</span>
                          <span className="text-gray-600 dark:text-gray-400">{count} cars</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Booking Status */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl text-gray-900 dark:text-white mb-4">
                  Booking Status
                </h3>
                <div className="space-y-4">
                  {['pending', 'approved', 'rejected'].map((status) => {
                    const count = bookings.filter(b => b.status === status).length;
                    const percentage = bookings.length > 0 ? (count / bookings.length) * 100 : 0;
                    return (
                      <div key={status}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700 dark:text-gray-300 capitalize">{status}</span>
                          <span className="text-gray-600 dark:text-gray-400">{count} bookings</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              status === 'approved' ? 'bg-green-600' :
                              status === 'rejected' ? 'bg-red-600' :
                              'bg-yellow-600'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Add/Edit Car Modal */}
      <Dialog open={showCarModal} onOpenChange={setShowCarModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCar ? 'Edit Car' : 'Add New Car'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCarSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Car Name *</Label>
                <Input
                  value={carFormData.name}
                  onChange={(e) => setCarFormData({ ...carFormData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Brand</Label>
                <Input
                  value={carFormData.brand}
                  onChange={(e) => setCarFormData({ ...carFormData, brand: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select 
                  value={carFormData.category} 
                  onValueChange={(value: any) => setCarFormData({ ...carFormData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Fuel Type *</Label>
                <Select 
                  value={carFormData.fuelType} 
                  onValueChange={(value: any) => setCarFormData({ ...carFormData, fuelType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Year *</Label>
                <Input
                  type="number"
                  value={carFormData.year}
                  onChange={(e) => setCarFormData({ ...carFormData, year: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label>Price *</Label>
                <Input
                  type="number"
                  value={carFormData.price}
                  onChange={(e) => setCarFormData({ ...carFormData, price: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Image URL *</Label>
              <Input
                value={carFormData.image}
                onChange={(e) => setCarFormData({ ...carFormData, image: e.target.value })}
                placeholder="https://example.com/car.jpg"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Horsepower *</Label>
                <Input
                  type="number"
                  value={carFormData.horsepower}
                  onChange={(e) => setCarFormData({ ...carFormData, horsepower: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label>Torque (Nm) *</Label>
                <Input
                  type="number"
                  value={carFormData.torque}
                  onChange={(e) => setCarFormData({ ...carFormData, torque: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label>Top Speed (km/h) *</Label>
                <Input
                  type="number"
                  value={carFormData.topSpeed}
                  onChange={(e) => setCarFormData({ ...carFormData, topSpeed: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Engine *</Label>
                <Input
                  value={carFormData.engine}
                  onChange={(e) => setCarFormData({ ...carFormData, engine: e.target.value })}
                  placeholder="e.g., V8 Twin Turbo"
                  required
                />
              </div>
              <div>
                <Label>0-100 km/h *</Label>
                <Input
                  value={carFormData.acceleration}
                  onChange={(e) => setCarFormData({ ...carFormData, acceleration: e.target.value })}
                  placeholder="e.g., 3.2s"
                  required
                />
              </div>
            </div>

            {carFormData.fuelType === 'Electric' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Range (km)</Label>
                  <Input
                    type="number"
                    value={carFormData.range || ''}
                    onChange={(e) => setCarFormData({ ...carFormData, range: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Battery</Label>
                  <Input
                    value={carFormData.battery || ''}
                    onChange={(e) => setCarFormData({ ...carFormData, battery: e.target.value })}
                    placeholder="e.g., 100 kWh"
                  />
                </div>
              </div>
            )}

            <div>
              <Label>Description *</Label>
              <Textarea
                value={carFormData.description}
                onChange={(e) => setCarFormData({ ...carFormData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={carFormData.featured}
                  onChange={(e) => setCarFormData({ ...carFormData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-gray-700 dark:text-gray-300">Featured</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={carFormData.comingSoon}
                  onChange={(e) => setCarFormData({ ...carFormData, comingSoon: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-gray-700 dark:text-gray-300">Coming Soon</span>
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {editingCar ? 'Update Car' : 'Add Car'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCarModal(false);
                  setEditingCar(null);
                  resetCarForm();
                }}
                className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
