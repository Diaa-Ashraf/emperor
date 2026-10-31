import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import HeroSection from '../components/home/HeroSection';
import CategoryShowcase from '../components/home/CategoryShowcase';
import TrustFeaturesBar from '../components/home/TrustFeaturesBar';
import SupportedCountries from '../components/home/SupportedCountries';
import { catalogApi, depositsApi } from '../api/endpoints';
import '../../css/homePage.css';

export default function HomePage() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch categories, products, and supported countries concurrently
        Promise.all([
            catalogApi.getCategories().catch(() => ({ data: [] })),
            catalogApi.getProducts({ limit: 100, per_page: 100 }).catch(() => ({ data: [] })),
            depositsApi.getSupportedCountries().catch(() => ({ data: [] })),
        ])
        .then(([catRes, prodRes, countRes]) => {
            const catData = Array.isArray(catRes?.data) ? catRes.data : (catRes?.data?.data || []);
            const prodData = Array.isArray(prodRes?.data) ? prodRes.data : (prodRes?.data?.data || []);
            const countData = Array.isArray(countRes?.data) ? countRes.data : (countRes?.data?.data || []);
            
            setCategories(catData.filter(c => c.is_active !== false));
            setProducts(prodData.filter(p => p.type !== 'target'));
            setCountries(countData);
        })
        .finally(() => setLoading(false));
    }, []);

    return (
        <MainLayout showBanner={false}>
            <div className="emperor-home-wrapper">
                {/* 1. Main Luxury Hero with Brand, Badges & Integrated Live Search */}
                <HeroSection products={products} categories={categories} />

                {/* 2. Visual Dual Category Showcase Tiles (e.g. Games, Transfers, Apps) */}
                <CategoryShowcase categories={categories} products={products} />

                {/* 3. Luxury 4 Trust Features Bar (Safe, Fast, 24/7 Support, Competitive Prices) */}
                <TrustFeaturesBar />

                {/* 4. Dynamic Supported Countries Indicator Bar */}
                <SupportedCountries countries={countries} loading={loading} />
            </div>
        </MainLayout>
    );
}
