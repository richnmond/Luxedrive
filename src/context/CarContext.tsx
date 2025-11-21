import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: 'SUV' | 'Sedan' | 'Electric' | 'Sports';
  year: number;
  price: number;
  image: string;
  images: string[];
  horsepower: number;
  torque: number;
  engine: string;
  range?: number;
  battery?: string;
  acceleration: string;
  topSpeed: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  description: string;
  colors: { name: string; code: string; image: string }[];
  featured?: boolean;
  comingSoon?: boolean;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  carId: string;
  carName: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface CarContextType {
  cars: Car[];
  bookings: Booking[];
  addCar: (car: Car) => void;
  updateCar: (id: string, car: Car) => void;
  deleteCar: (id: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  updateBookingStatus: (id: string, status: 'pending' | 'approved' | 'rejected') => void;
  deleteBooking: (id: string) => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

const initialCars: Car[] = [
  {
    id: '1',
    name: 'Phantom X1',
    brand: 'LuxeDrive',
    category: 'Electric',
    year: 2024,
    price: 89999,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
    images: [
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
      'https://images.unsplash.com/photo-1617531653520-bd4ab2a0cbd5?w=800',
      'https://images.unsplash.com/photo-1617531653333-bd46c24f2068?w=800'
    ],
    horsepower: 450,
    torque: 600,
    engine: 'Dual Electric Motor',
    range: 520,
    battery: '100 kWh',
    acceleration: '3.2s',
    topSpeed: 250,
    fuelType: 'Electric',
    description: 'Experience the future of luxury electric driving with cutting-edge technology and unmatched performance.',
    colors: [
      { name: 'Midnight Black', code: '#000000', image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800' },
      { name: 'Glacier White', code: '#FFFFFF', image: 'https://images.unsplash.com/photo-1617531653520-bd4ab2a0cbd5?w=800' },
      { name: 'Royal Blue', code: '#1e40af', image: 'https://images.unsplash.com/photo-1617531653333-bd46c24f2068?w=800' }
    ],
    featured: true
  },
  {
    id: '2',
    name: 'Storm GT',
    brand: 'LuxeDrive',
    category: 'Sports',
    year: 2024,
    price: 125000,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800'
    ],
    horsepower: 720,
    torque: 850,
    engine: 'V8 Twin Turbo',
    acceleration: '2.8s',
    topSpeed: 320,
    fuelType: 'Petrol',
    description: 'Unleash pure power with our flagship sports car, engineered for speed and precision.',
    colors: [
      { name: 'Racing Red', code: '#DC2626', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800' },
      { name: 'Carbon Black', code: '#1a1a1a', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800' }
    ],
    featured: true
  },
  {
    id: '3',
    name: 'Summit Pro',
    brand: 'LuxeDrive',
    category: 'SUV',
    year: 2024,
    price: 75000,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'
    ],
    horsepower: 380,
    torque: 520,
    engine: 'V6 Hybrid',
    range: 680,
    acceleration: '5.1s',
    topSpeed: 210,
    fuelType: 'Hybrid',
    description: 'The perfect blend of luxury, space, and capability for modern families.',
    colors: [
      { name: 'Pearl White', code: '#f8f8f8', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800' },
      { name: 'Graphite Gray', code: '#4a5568', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800' }
    ],
    featured: false
  },
  {
    id: '4',
    name: 'Elite S',
    brand: 'LuxeDrive',
    category: 'Sedan',
    year: 2024,
    price: 62000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'
    ],
    horsepower: 310,
    torque: 400,
    engine: '2.0L Turbocharged I4',
    acceleration: '5.5s',
    topSpeed: 240,
    fuelType: 'Petrol',
    description: 'Sophisticated elegance meets cutting-edge technology in our premium sedan.',
    colors: [
      { name: 'Sapphire Blue', code: '#1e40af', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800' },
      { name: 'Silver Metallic', code: '#9ca3af', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800' }
    ],
    featured: false
  },
  {
    id: '5',
    name: 'Velocity EV',
    brand: 'LuxeDrive',
    category: 'Electric',
    year: 2025,
    price: 95000,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800'
    ],
    horsepower: 500,
    torque: 700,
    engine: 'Tri-Motor Electric',
    range: 600,
    battery: '120 kWh',
    acceleration: '2.9s',
    topSpeed: 280,
    fuelType: 'Electric',
    description: 'Next-generation electric performance with revolutionary technology.',
    colors: [
      { name: 'Electric Blue', code: '#3b82f6', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800' },
      { name: 'Stealth Black', code: '#0a0a0a', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800' }
    ],
    featured: true,
    comingSoon: true
  },
  {
    id: '6',
    name: 'Urban X',
    brand: 'LuxeDrive',
    category: 'SUV',
    year: 2024,
    price: 58000,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
    ],
    horsepower: 280,
    torque: 360,
    engine: '2.5L I4',
    acceleration: '6.2s',
    topSpeed: 200,
    fuelType: 'Petrol',
    description: 'Compact SUV designed for city life with premium features.',
    colors: [
      { name: 'Urban Gray', code: '#6b7280', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800' },
      { name: 'White Pearl', code: '#fafafa', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800' }
    ],
    featured: false
  }
];

export function CarProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>(() => {
    const saved = localStorage.getItem('cars');
    return saved ? JSON.parse(saved) : initialCars;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addCar = (car: Car) => {
    setCars([...cars, car]);
  };

  const updateCar = (id: string, updatedCar: Car) => {
    setCars(cars.map(car => car.id === id ? updatedCar : car));
  };

  const deleteCar = (id: string) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setBookings([...bookings, newBooking]);
  };

  const updateBookingStatus = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  const deleteBooking = (id: string) => {
    setBookings(bookings.filter(booking => booking.id !== id));
  };

  return (
    <CarContext.Provider value={{ 
      cars, 
      bookings, 
      addCar, 
      updateCar, 
      deleteCar, 
      addBooking,
      updateBookingStatus,
      deleteBooking
    }}>
      {children}
    </CarContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarContext);
  if (!context) throw new Error('useCars must be used within CarProvider');
  return context;
}
