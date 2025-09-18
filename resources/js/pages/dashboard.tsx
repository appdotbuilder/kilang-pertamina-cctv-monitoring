import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Stats {
    buildings: {
        total: number;
        active: number;
        inactive: number;
    };
    rooms: {
        total: number;
        active: number;
        inactive: number;
    };
    cameras: {
        total: number;
        online: number;
        offline: number;
        maintenance: number;
        active: number;
    };
    users: {
        total: number;
        online: number;
        offline: number;
        admin: number;
        security_operator: number;
    };
}

interface Building {
    id: number;
    name: string;
    code: string;
    total_cameras: number;
    online_cameras: number;
    offline_cameras: number;
    maintenance_cameras: number;
}

interface Notification {
    id: number;
    type: string;
    title: string;
    message: string;
    read_at: string | null;
    created_at: string;
    user?: {
        id: number;
        name: string;
    };
}

interface Props {
    stats: Stats;
    buildings: Building[];
    recentNotifications: Notification[];
    [key: string]: unknown;
}

export default function Dashboard({ stats, buildings, recentNotifications }: Props) {


    const calculatePercentage = (value: number, total: number) => {
        if (total === 0) return 0;
        return Math.round((value / total) * 100);
    };

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        📊 CCTV Monitoring Dashboard
                    </h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                        Kilang Pertamina Internasional - Refinery Unit VI Balongan
                    </p>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Buildings */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <div className="text-3xl">🏢</div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Buildings</h3>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.buildings.total}</div>
                                <p className="text-xs text-green-600 dark:text-green-400">
                                    {stats.buildings.active} Active
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Rooms */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <div className="text-3xl">🚪</div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Rooms</h3>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.rooms.total}</div>
                                <p className="text-xs text-green-600 dark:text-green-400">
                                    {stats.rooms.active} Active
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CCTV Cameras */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <div className="text-3xl">📹</div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">CCTV Cameras</h3>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.cameras.total}</div>
                                <div className="flex space-x-2 text-xs mt-1">
                                    <span className="text-green-600">Online: {stats.cameras.online}</span>
                                    <span className="text-red-600">Offline: {stats.cameras.offline}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Users */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <div className="text-3xl">👥</div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</h3>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.users.online}</div>
                                <p className="text-xs text-blue-600 dark:text-blue-400">
                                    {stats.users.total} Total Users
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Camera Status Overview */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        <span className="text-2xl mr-2">📊</span>
                        Camera Status Overview
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-2">{stats.cameras.online}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Online Cameras</div>
                            <div className="text-xs text-gray-500 mt-1">
                                {calculatePercentage(stats.cameras.online, stats.cameras.total)}% of total
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-600 mb-2">{stats.cameras.offline}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Offline Cameras</div>
                            <div className="text-xs text-gray-500 mt-1">
                                {calculatePercentage(stats.cameras.offline, stats.cameras.total)}% of total
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.cameras.maintenance}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Maintenance</div>
                            <div className="text-xs text-gray-500 mt-1">
                                {calculatePercentage(stats.cameras.maintenance, stats.cameras.total)}% of total
                            </div>
                        </div>
                    </div>

                    {/* Status Bar */}
                    <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                            className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-300"
                            style={{ width: `${calculatePercentage(stats.cameras.online, stats.cameras.total)}%` }}
                        ></div>
                        <div 
                            className="absolute top-0 h-full bg-red-500 transition-all duration-300"
                            style={{ 
                                left: `${calculatePercentage(stats.cameras.online, stats.cameras.total)}%`,
                                width: `${calculatePercentage(stats.cameras.offline, stats.cameras.total)}%`
                            }}
                        ></div>
                        <div 
                            className="absolute top-0 h-full bg-yellow-500 transition-all duration-300"
                            style={{ 
                                left: `${calculatePercentage(stats.cameras.online + stats.cameras.offline, stats.cameras.total)}%`,
                                width: `${calculatePercentage(stats.cameras.maintenance, stats.cameras.total)}%`
                            }}
                        ></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Building Status */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                            <span className="text-2xl mr-2">🏢</span>
                            Buildings Status
                        </h2>
                        
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {buildings.map((building) => (
                                <div key={building.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 dark:text-white">{building.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{building.code}</p>
                                    </div>
                                    <div className="flex space-x-2 text-xs">
                                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded">
                                            Online: {building.online_cameras}
                                        </span>
                                        <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded">
                                            Offline: {building.offline_cameras}
                                        </span>
                                        {building.maintenance_cameras > 0 && (
                                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded">
                                                Maintenance: {building.maintenance_cameras}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Notifications */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                            <span className="text-2xl mr-2">🔔</span>
                            Recent Notifications
                        </h2>
                        
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {recentNotifications.length > 0 ? (
                                recentNotifications.map((notification) => (
                                    <div 
                                        key={notification.id} 
                                        className={`p-3 rounded-lg border ${
                                            notification.read_at 
                                                ? 'border-gray-200 dark:border-gray-600 opacity-75' 
                                                : 'border-blue-200 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                                    {notification.title}
                                                </h4>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                    {new Date(notification.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                            {!notification.read_at && (
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    <div className="text-3xl mb-2">📭</div>
                                    <p>No recent notifications</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        <span className="text-2xl mr-2">⚡</span>
                        Quick Actions
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <a 
                            href={route('maps.index')} 
                            className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="text-2xl mr-3">🗺️</div>
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">View Maps</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Interactive CCTV map</p>
                            </div>
                        </a>
                        
                        <a 
                            href={route('location.index')} 
                            className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="text-2xl mr-3">📍</div>
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">Locations</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Browse by location</p>
                            </div>
                        </a>
                        
                        <a 
                            href={route('contact.index')} 
                            className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="text-2xl mr-3">📞</div>
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">Contacts</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Emergency contacts</p>
                            </div>
                        </a>
                        
                        <a 
                            href={route('notifications.index')} 
                            className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="text-2xl mr-3">🔔</div>
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">Notifications</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">View all alerts</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}