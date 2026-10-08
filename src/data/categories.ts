import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'smartphones',
    slug: 'smartphones',
    name: 'Smartphones',
    shortDescription: 'Smartphones, flagship phones, budget phones, camera phones and gaming phones.',
    image: '/src/assets/images/category_smartphones_flagship_1791450627367.jpg',
    subcategories: ['Flagship Phones', 'Camera Phones', 'Budget Phones', 'Gaming Phones', 'Foldables'],
    order: 1
  },
  {
    id: 'audio',
    slug: 'audio',
    name: 'Earbuds & Headphones',
    shortDescription: 'Wireless earbuds, TWS, noise-cancelling headphones, over-ear headphones and gaming headsets.',
    image: '/src/assets/images/category_audio_headphones_1791450638492.jpg',
    subcategories: ['Wireless Earbuds', 'Noise-Cancelling', 'Over-Ear Headphones', 'Gaming Headsets', 'Audiophile Wired'],
    order: 2
  },
  {
    id: 'speakers',
    slug: 'speakers',
    name: 'Speakers & Audio',
    shortDescription: 'Bluetooth speakers, portable speakers, smart speakers, soundbars and home audio.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Soundbars', 'Portable Bluetooth', 'Smart Speakers', 'Home Theater', 'Subwoofers'],
    order: 3
  },
  {
    id: 'computers',
    slug: 'computers',
    name: 'Laptops & Computers',
    shortDescription: 'Laptops, gaming laptops, MacBooks, desktops, mini PCs, monitors and computer accessories.',
    image: '/src/assets/images/category_laptops_creator_1791450649482.jpg',
    subcategories: ['MacBooks', 'Gaming Laptops', 'Ultrabooks', 'Mini PCs', 'Monitors'],
    order: 4
  },
  {
    id: 'tvs',
    slug: 'tvs',
    name: 'TVs & Home Entertainment',
    shortDescription: 'Smart TVs, OLED, QLED, projectors, streaming devices and TV accessories.',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    subcategories: ['OLED TVs', 'QD-OLED', 'Mini-LED', '4K Projectors', 'Streaming Devices'],
    order: 5
  },
  {
    id: 'appliances',
    slug: 'appliances',
    name: 'Home Appliances',
    shortDescription: 'Air conditioners, air purifiers, robot vacuums, vacuum cleaners, air fryers, coffee machines, microwaves and blenders.',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Robot Vacuums', 'Cordless Vacuums', 'Air Fryers', 'Espresso Machines', 'Air Purifiers'],
    order: 6
  },
  {
    id: 'wearables',
    slug: 'wearables',
    name: 'Wearables',
    shortDescription: 'Smartwatches, fitness trackers, smart rings and wearable accessories.',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Smartwatches', 'Smart Rings', 'Fitness Bands', 'Outdoor Sports Watches'],
    order: 7
  },
  {
    id: 'gaming',
    slug: 'gaming',
    name: 'Gaming',
    shortDescription: 'Gaming consoles, handheld consoles, controllers, gaming headsets, gaming monitors and accessories.',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Home Consoles', 'Handheld Consoles', 'Controllers', 'VR Headsets', 'Sim Racing'],
    order: 8
  },
  {
    id: 'smarthome',
    slug: 'smarthome',
    name: 'Smart Home',
    shortDescription: 'Smart lighting, smart plugs, security cameras, video doorbells, smart displays and hubs.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Security Cameras', 'Smart Lighting', 'Video Doorbells', 'Smart Thermostats', 'Matter Hubs'],
    order: 9
  },
  {
    id: 'cameras',
    slug: 'cameras',
    name: 'Cameras & Photography',
    shortDescription: 'Mirrorless cameras, digital cameras, action cameras, drones, gimbals and photography accessories.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Mirrorless Cameras', 'Action Cams', 'Compact Drones', 'Gimbals', 'Vlog Cameras'],
    order: 10
  },
  {
    id: 'power',
    slug: 'power',
    name: 'Chargers & Power',
    shortDescription: 'Power banks, fast chargers, GaN chargers, wireless chargers, charging stations and cables.',
    image: 'https://images.unsplash.com/photo-1609592426861-6869719c1e13?auto=format&fit=crop&w=800&q=80',
    subcategories: ['GaN Chargers', 'Power Banks', 'Wireless Charging Stations', 'High-Wattage Cables'],
    order: 11
  },
  {
    id: 'accessories',
    slug: 'accessories',
    name: 'Accessories',
    shortDescription: 'Phone cases, screen protectors, laptop stands, mechanical keyboards, mice and USB hubs.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Mechanical Keyboards', 'Ergonomic Mice', 'Laptop Stands', 'Thunderbolt Hubs', 'Storage'],
    order: 12
  }
];
