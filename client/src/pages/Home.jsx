import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { ChevronRight, Home as HomeIcon, DollarSign, TrendingUp, Search, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import ListingItem from '../components/ListingItem';
import { buildApiUrl, API_ENDPOINTS } from '../config/api.js';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  SwiperCore.use([Navigation]);

  const slides = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  ];
  const items = [
    { icon: HomeIcon, number: "1000+", label: "Properties Listed" },
    { icon: DollarSign, number: "$500M+", label: "Property Value Sold" },
    { icon: TrendingUp, number: "98%", label: "Client Satisfaction" },
    { icon: ChevronRight, number: "20+", label: "Years of Experience" },
  ]

  useEffect(() => {
    const fetchOfferListings = async () => {  
      try {
        const res = await fetch(buildApiUrl(`${API_ENDPOINTS.GET_LISTING}?offer=true&limit=4`));
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch(buildApiUrl(`${API_ENDPOINTS.GET_LISTING}?type=rent&limit=4`));
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(buildApiUrl(`${API_ENDPOINTS.GET_LISTING}?type=sale&limit=4`));
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const testimonials = [
    { name: "John Doe", comment: "Al-Rehman Estate helped me find my dream home in record time. Their service is unparalleled!", rating: 5 },
    { name: "Jane Smith", comment: "The team at Al-Rehman Estate is professional, knowledgeable, and always goes the extra mile.", rating: 5 },
    { name: "Mike Johnson", comment: "I've worked with many real estate agencies, but Al-Rehman Estate stands out for their dedication and expertise.", rating: 4 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      {/* Hero Section with Slider */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <button onClick={prevSlide} className="absolute left-4 z-10 bg-gray-900 bg-opacity-50 p-2 rounded-full hover:bg-gray-800">
          <ArrowLeft className="text-white" />
        </button>

        <button onClick={nextSlide} className="absolute right-4 z-10 bg-gray-900 bg-opacity-50 p-2 rounded-full hover:bg-gray-800">
          <ArrowRight className="text-white" />
        </button>

        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-4 text-shadow-xl"
          >
            Welcome to Al-Rehman Estate
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 text-gray-200"
          >
            Find your dream home with ease
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/search"
              className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-lg"
            >
              Start Your Search
              <Search className="inline-block ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>


      {/* Our Success in Numbers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Success in Numbers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.0 }}
                transition={{
                  duration: 0.1,
                  delay: index * 0.1,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md transform transition duration-500 hover:shadow-lg"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1 + index * 0.1
                  }}
                >
                  <item.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                </motion.div>
                <motion.p
                  className="text-4xl font-bold text-blue-600 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  {item.number}
                </motion.p>
                <motion.p
                  className="text-gray-600 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {item.label}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Swiper for Offer Listings */}
      {/* <Swiper navigation className="mb-8">
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
              ></div>
            </SwiperSlide>
          ))}
      </Swiper> */}

      {/* Listing Results */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {/* Recent Offers */}
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?offer=true'}
              >
                Show more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Properties for Rent */}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Properties for Rent</h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?type=rent'}
              >
                View All Rentals
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Properties for Sale */}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Properties for Sale</h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={'/search?type=sale'}
              >
                View All Properties for Sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Featured Neighborhoods Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Neighborhoods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Downtown", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", description: "Vibrant urban living with easy access to restaurants and entertainment." },
              { name: "Suburbia", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", description: "Peaceful residential areas perfect for families and nature lovers." },
              { name: "Beachfront", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", description: "Luxurious properties with stunning ocean views and beach access." },
            ].map((neighborhood, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <img src={neighborhood.image} alt={neighborhood.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{neighborhood.name}</h3>
                  <p className="text-gray-600 mb-4">{neighborhood.description}</p>
                  <Link to={`/search?neighborhood=${neighborhood.name}`} className="text-blue-600 hover:underline">
                    Explore properties
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md"
              >
                <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{testimonial.name}</span>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-200 text-[#647491]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#3a456b]">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 text-[#4e5f7a]">Let Al-Rehman Estate guide you to your perfect property</p>
          <Link to="/search" className="inline-block bg-[#647491] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#505f7a] transition duration-300">
            Start Your Journey <ChevronRight className="inline-block ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}