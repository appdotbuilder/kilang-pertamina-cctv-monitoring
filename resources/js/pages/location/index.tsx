import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import React, { useState } from 'react';

interface Building {
    id: number;
    name: string;
    code: string;
    description: string;
    rooms_count: number;
    cameras_count: number;
    online_cameras_count: number;
    offline_cameras_count: number;
    maintenance_cameras_count: number;
}

interface Props {
    buildings: Building[];
    [key: string]: unknown;
}

export default function LocationIndex({ buildings }: Props) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBuildings = buildings.filter(building =>
        building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        building.code.toLowerCase().includes(searchQuery.toLowerCase())
    );



    return (
        <AppShell>
            <Head title="Location Hierarchy - CCTV Monitoring" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                            <span className="text-2xl mr-2">📍</span>
                            Location Hierarchy
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            Browse buildings, rooms, and CCTV cameras by location
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="max-w-md">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            🔍 Search Buildings
                        </label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Enter building name or code..."
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                {/* Buildings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBuildings.map((building) => (
                        <Link
                            key={building.id}
                            href={route('location.building', building.id)}
                            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200 overflow-hidden group"
                        >
                            {/* Building Header */}
                            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-blue-900/30 dark:group-hover:to-indigo-900/30 transition-colors">
                                <div className="flex items-center mb-2">
                                    <div className="text-2xl mr-3">🏢</div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300">
                                            {building.name}
                                        </h3>
                                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                            {building.code}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                    {building.description}
                                </p>
                            </div>

                            {/* Building Stats */}
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {building.rooms_count}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Rooms
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {building.cameras_count}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Cameras
                                        </div>
                                    </div>
                                </div>

                                {/* Camera Status */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Camera Status:</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <div className="flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded">
                                            <span className="mr-1">🟢</span>
                                            {building.online_cameras_count} Online
                                        </div>
                                        <div className="flex items-center px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded">
                                            <span className="mr-1">🔴</span>
                                            {building.offline_cameras_count} Offline
                                        </div>
                                        {building.maintenance_cameras_count > 0 && (
                                            <div className="flex items-center px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded">
                                                <span className="mr-1">🟡</span>
                                                {building.maintenance_cameras_count} Maint.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-4">
                                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                                        <span>Camera Health</span>
                                        <span>
                                            {Math.round((building.online_cameras_count / building.cameras_count) * 100)}% Online
                                        </span>
                                    </div>
                                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div 
                                            className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-300"
                                            style={{ 
                                                width: `${(building.online_cameras_count / building.cameras_count) * 100}%` 
                                            }}
                                        ></div>
                                        <div 
                                            className="absolute top-0 h-full bg-red-500 transition-all duration-300"
                                            style={{ 
                                                left: `${(building.online_cameras_count / building.cameras_count) * 100}%`,
                                                width: `${(building.offline_cameras_count / building.cameras_count) * 100}%`
                                            }}
                                        ></div>
                                        <div 
                                            className="absolute top-0 h-full bg-yellow-500 transition-all duration-300"
                                            style={{ 
                                                left: `${((building.online_cameras_count + building.offline_cameras_count) / building.cameras_count) * 100}%`,
                                                width: `${(building.maintenance_cameras_count / building.cameras_count) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="px-6 pb-6">
                                <div className="w-full bg-blue-600 text-white text-center py-2 rounded-lg font-medium group-hover:bg-blue-700 transition-colors">
                                    View Rooms & Cameras →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredBuildings.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-4">🏢</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No buildings found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Try adjusting your search criteria
                        </p>
                    </div>
                )}

                {/* Summary Stats */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <span className="text-2xl mr-2">📊</span>
                        Location Summary
                    </h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">
                                {filteredBuildings.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Buildings
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-600">
                                {filteredBuildings.reduce((sum, building) => sum + building.rooms_count, 0)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Rooms
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {filteredBuildings.reduce((sum, building) => sum + building.cameras_count, 0)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Cameras
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">
                                {filteredBuildings.reduce((sum, building) => sum + building.online_cameras_count, 0)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Online Cameras
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}