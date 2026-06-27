import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineBell } from 'react-icons/hi2';
import { FaUser, FaChartLine, FaArrowTrendUp } from 'react-icons/fa6';
import { Card, Badge } from './Core';

/**
 * Unified Dashboard Header
 */
export const DashboardHeader = ({ title, subtitle, userName, roleLabel, icon: Icon = FaChartLine }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <div className="space-y-2">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-[0.2em] text-xs"
                >
                    <Icon className="w-4 h-4" />
                    <span>{roleLabel}</span>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                    {title}, <span className="text-blue-600">{userName}</span>
                </h1>
                {subtitle && <p className="text-gray-400 font-bold">{subtitle}</p>}
            </div>

            <div className="flex items-center gap-4 bg-white p-3 pr-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer">
                    <HiOutlineBell className="w-6 h-6 text-gray-400" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black shadow-lg shadow-blue-600/20">
                    {userName.charAt(0)}
                </div>
            </div>
        </div>
    );
};

/**
 * Unified Stat Tile for Dashboards
 */
export const StatTile = ({ label, value, sub, icon: Icon, color = 'blue', trend }) => {
    const colorMap = {
        blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
        green: { bg: 'bg-green-50', text: 'text-green-600' },
        amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
        purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
        red: { bg: 'bg-red-50', text: 'text-red-600' }
    };
    const c = colorMap[color] || colorMap.blue;

    return (
        <Card p="p-8">
            <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${c.bg} ${c.text}`}>
                    <Icon className="w-8 h-8" />
                </div>
                {trend && (
                    <div className="flex items-center gap-1 text-green-500 font-black text-xs">
                        <FaArrowTrendUp className="w-3 h-3" />
                        <span>+{trend}%</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-3xl font-black text-gray-900 leading-none">{value}</p>
                {sub && <p className="text-xs font-bold text-gray-400 mt-3">{sub}</p>}
            </div>
        </Card>
    );
};
