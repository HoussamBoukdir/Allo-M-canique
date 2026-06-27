import React from 'react';
import { motion } from 'framer-motion';

/**
 * Standard Section Wrapper
 * Ensures consistent vertical padding and horizontal alignment across the app.
 */
export const Section = ({ children, className = '', id = '', background = 'transparent', noPadding = false }) => {
    return (
        <section
            id={id}
            className={`relative w-full ${noPadding ? '' : 'py-20 md:py-32'} ${className}`}
            style={{ background }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {children}
            </div>
        </section>
    );
};

/**
 * Premium Card Component
 * Unified styling for all cards (Feature, Testimonial, Dashboard tiles, etc.)
 */
export const Card = ({ children, className = '', hover = true, padding = 'p-10', onClick }) => {
    const baseStyles = "bg-white rounded-[2.5rem] border border-[rgba(0,0,0,0.03)] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] transition-all duration-300";
    const hoverStyles = hover ? "hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1" : "";

    return (
        <motion.div
            onClick={onClick}
            className={`${baseStyles} ${hoverStyles} ${padding} ${className} ${onClick ? 'cursor-pointer' : ''}`}
        >
            {children}
        </motion.div>
    );
};

/**
 * Unified Badge Component
 * Used for status, roles, and tags.
 */
export const Badge = ({ children, variant = 'blue', className = '' }) => {
    const variants = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        green: "bg-green-50 text-green-600 border-green-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
        red: "bg-red-50 text-red-600 border-red-100",
        purple: "bg-purple-50 text-purple-600 border-purple-100",
        gray: "bg-gray-50 text-gray-400 border-gray-100",
        dark: "bg-gray-900 text-white border-gray-900"
    };

    return (
        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${variants[variant] || variants.blue} ${className}`}>
            {children}
        </span>
    );
};

/**
 * Grid Container
 * Simple utility for responsive grids.
 */
export const Grid = ({ children, cols = 3, gap = 'gap-8', className = '' }) => {
    const colMap = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    };

    return (
        <div className={`grid ${colMap[cols] || colMap[3]} ${gap} ${className}`}>
            {children}
        </div>
    );
};
