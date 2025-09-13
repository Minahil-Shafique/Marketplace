'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import ProductList from '@/components/ProductList';
import { Product, User } from '@/types';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Fetch dummy products
    const dummyProducts: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'This is a sample product description.',
        price: 29.99,
        image_url: '/placeholder-image.jpg',
        seller_id: 'seller1',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Another sample product with a longer description that might span multiple lines.',
        price: 49.99,
        image_url: '/placeholder-image.jpg',
        seller_id: 'seller2',
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Product 3',
        description: 'A third product with different features and benefits.',
        price: 99.99,
        image_url: '/placeholder-image.jpg',
        seller_id: 'seller3',
        created_at: new Date().toISOString(),
      },
    ];
    
    setProducts(dummyProducts);
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <div className="dashboard-content">
        <h2>Welcome, {user.name}!</h2>
        <p>Your email: {user.email}</p>
        
        <h3>Available Products</h3>
        <ProductList products={products} />
      </div>
    </div>
  );
}