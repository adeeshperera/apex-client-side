'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Zap, Settings, Palette, Shield, Award, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import { serviceApi } from "../lib/auth";
import { Service } from "../types";

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await serviceApi.getServices();
        setServices(servicesData.slice(0, 6));
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const features = [
    {
      icon: <Shield className="w-12 h-12 text-orange-500" />,
      title: "Expert Technicians",
      description: "Certified professionals with years of automotive experience"
    },
    {
      icon: <Award className="w-12 h-12 text-orange-500" />,
      title: "Premium Quality",
      description: "Only the highest quality parts and materials used"
    },
    {
      icon: <Users className="w-12 h-12 text-orange-500" />,
      title: "Customer First",
      description: "Dedicated support throughout your customization journey"
    }
  ];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-8 h-8" />;
      case 'Settings':
        return <Settings className="w-8 h-8" />;
      case 'Palette':
        return <Palette className="w-8 h-8" />;
      default:
        return <Zap className="w-8 h-8" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/jack-lucas-smith-4-MxVqPiPk0-unsplash.jpg"
            alt="Car background"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            Transform Your
            <span className="gradient-text block">Dream Car</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto animate-fade-in-delay-1">
            Professional car customization services to make your vehicle stand out from the crowd
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <Link
              href="/customize"
              className="btn-primary px-8 py-4 text-white rounded-xl text-lg font-semibold shadow-2xl"
            >
              Start Customizing
            </Link>
            <Link
              href="#services"
              className="px-8 py-4 border-2 border-white/20 glass text-white rounded-xl text-lg font-semibold hover:border-orange-500/50 transition-all duration-300"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Our Services</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Professional automotive customization services to enhance performance, style, and functionality
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div 
                key={service._id} 
                className={`glass p-6 rounded-2xl card-hover animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-orange-500 mr-3 p-2 bg-orange-500/10 rounded-lg">
                    {getServiceIcon(service.icon || 'Zap')}
                  </div>
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                </div>
                <p className="text-gray-400 mb-6 line-clamp-2">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold gradient-text">${service.price}</span>
                  <span className="text-xs font-medium text-gray-300 bg-gray-700/50 px-3 py-1 rounded-full border border-gray-600">
                    {service.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Why Choose Apex Auto?</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              We&apos;re committed to delivering exceptional results that exceed your expectations
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`text-center p-6 sm:p-8 glass rounded-2xl card-hover animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-orange-500/10 rounded-2xl">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-gray-900 to-black py-12 sm:py-16 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ready to Transform Your Car?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of satisfied customers who trust us with their automotive dreams
          </p>
          <Link
            href="/register"
            className="btn-primary px-8 py-4 text-white rounded-xl text-lg font-semibold inline-block shadow-2xl"
          >
            Get Started Today
          </Link>
        </div>
      </footer>
    </div>
  );
}
