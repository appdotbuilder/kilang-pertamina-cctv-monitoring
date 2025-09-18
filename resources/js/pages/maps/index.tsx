import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import React, { useState } from 'react';

interface Camera {
    id: number;
    name: string;
    ip_address: string;
    latitude: number;
    longitude: number;
    status: 'online' | 'offline' | 'maintenance';
    brand: string;
    model: string;
    hls_url: string;
    rtsp_url: string;
    last_ping_at: string | null;
}

interface Room {
    id: number;
    name: string;
    code: string;
    latitude: number;
    longitude: number;
    cameras: Camera[];
}

interface Building {
    id: number;
    name: string;
    code: string;
    description: string;
    latitude: number;
    longitude: number;
    icon: string;
    total_cameras: number;
    online_cameras: number;
    offline_cameras: number;
    maintenance_cameras: number;
    rooms: Room[];
}

interface Stats {
    total_buildings: number;
    total_cameras: number;
    online_cameras: number;
    offline_cameras: number;
    maintenance_cameras: number;
}

interface Props {
    buildings: Building[];
    stats: Stats;
    [key: string]: unknown;
}

export default function MapsIndex({ buildings, stats }: Props) {
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [mapView, setMapView] = useState<'osm' | 'satellite'>('osm');
    const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'text-green-600 bg-green-100 border-green-200';
            case 'offline': return 'text-red-600 bg-red-100 border-red-200';
            case 'maintenance': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
            default: return 'text-gray-600 bg-gray-100 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'online': return '🟢';
            case 'offline': return '🔴';
            case 'maintenance': return '🟡';
            default: return '⚪';
        }
    };

    const filteredBuildings = buildings.filter(building => {
        if (searchQuery && !building.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        return true;
    });

    const getFilteredCameras = (building: Building) => {
        if (filterStatus === 'all') {
            return building.rooms.flatMap(room => room.cameras);
        }
        return building.rooms.flatMap(room => 
            room.cameras.filter(camera => camera.status === filterStatus)
        );
    };

    return (
        <AppShell>
            <Head title="Interactive Maps - CCTV Monitoring" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                            <span className="text-2xl mr-2">🗺️</span>
                            Interactive CCTV Maps
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            Real-time monitoring of CCTV cameras across Kilang Pertamina facilities
                        </p>
                    </div>
                    
                    {/* Map View Toggle */}
                    <div className="flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <button
                            onClick={() => setMapView('osm')}
                            className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                                mapView === 'osm'
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            🗺️ OpenStreetMap
                        </button>
                        <button
                            onClick={() => setMapView('satellite')}
                            className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                                mapView === 'satellite'
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            🛰️ Satellite
                        </button>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="text-2xl font-bold text-blue-600">{stats.total_buildings}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Buildings</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_cameras}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Cameras</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="text-2xl font-bold text-green-600">{stats.online_cameras}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Online</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="text-2xl font-bold text-red-600">{stats.offline_cameras}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Offline</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="text-2xl font-bold text-yellow-600">{stats.maintenance_cameras}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Maintenance</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Controls Panel */}
                    <div className="space-y-6">
                        {/* Search */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                🔍 Search Buildings
                            </label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Enter building name..."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Filter by Status
                            </label>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setFilterStatus('all')}
                                    className={`w-full flex items-center px-3 py-2 text-sm rounded transition-colors ${
                                        filterStatus === 'all'
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    <span className="mr-2">⚫</span>
                                    All Cameras ({stats.total_cameras})
                                </button>
                                <button
                                    onClick={() => setFilterStatus('online')}
                                    className={`w-full flex items-center px-3 py-2 text-sm rounded transition-colors ${
                                        filterStatus === 'online'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    <span className="mr-2">🟢</span>
                                    Online ({stats.online_cameras})
                                </button>
                                <button
                                    onClick={() => setFilterStatus('offline')}
                                    className={`w-full flex items-center px-3 py-2 text-sm rounded transition-colors ${
                                        filterStatus === 'offline'
                                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    <span className="mr-2">🔴</span>
                                    Offline ({stats.offline_cameras})
                                </button>
                                <button
                                    onClick={() => setFilterStatus('maintenance')}
                                    className={`w-full flex items-center px-3 py-2 text-sm rounded transition-colors ${
                                        filterStatus === 'maintenance'
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    <span className="mr-2">🟡</span>
                                    Maintenance ({stats.maintenance_cameras})
                                </button>
                            </div>
                        </div>

                        {/* Buildings List */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                                🏢 Buildings
                            </h3>
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {filteredBuildings.map((building) => (
                                    <button
                                        key={building.id}
                                        onClick={() => setSelectedBuilding(building)}
                                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                            selectedBuilding?.id === building.id
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                                                : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {building.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {building.code}
                                        </div>
                                        <div className="flex space-x-2 mt-2">
                                            <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded">
                                                🟢 {building.online_cameras}
                                            </span>
                                            <span className="inline-flex items-center px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded">
                                                🔴 {building.offline_cameras}
                                            </span>
                                            {building.maintenance_cameras > 0 && (
                                                <span className="inline-flex items-center px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded">
                                                    🟡 {building.maintenance_cameras}
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Map Area */}
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            {/* Map Header */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                            {selectedBuilding ? selectedBuilding.name : 'Kilang Pertamina - CCTV Map View'}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {selectedBuilding 
                                                ? `${selectedBuilding.total_cameras} cameras in ${selectedBuilding.rooms.length} rooms`
                                                : `${stats.total_buildings} buildings with ${stats.total_cameras} cameras`
                                            }
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        View: {mapView === 'osm' ? '🗺️ OpenStreetMap' : '🛰️ Satellite'}
                                    </div>
                                </div>
                            </div>

                            {/* Map Container */}
                            <div className="h-96 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <div className="text-center p-8">
                                    <div className="text-4xl mb-4">🗺️</div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        Interactive Map
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        Leaflet.js map will be integrated here showing:
                                    </p>
                                    <div className="text-left space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                        <p>• Building markers with camera counts</p>
                                        <p>• Room markers on building zoom</p>
                                        <p>• Color-coded camera status (🟢🔴🟡)</p>
                                        <p>• Live stream popup on camera click</p>
                                        <p>• {mapView} base layer</p>
                                    </div>
                                    {selectedBuilding && (
                                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                                                Viewing: {selectedBuilding.name}
                                            </h4>
                                            <p className="text-sm text-blue-700 dark:text-blue-400">
                                                Coordinates: {selectedBuilding.latitude?.toFixed(6)}, {selectedBuilding.longitude?.toFixed(6)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Camera Details Panel */}
                            {selectedBuilding && (
                                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                                        📹 Cameras in {selectedBuilding.name}
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                                        {getFilteredCameras(selectedBuilding).map((camera) => (
                                            <div 
                                                key={camera.id} 
                                                className={`p-3 rounded-lg border ${getStatusColor(camera.status)} cursor-pointer hover:shadow-md transition-shadow`}
                                                onClick={() => setSelectedCamera(camera)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center">
                                                            <span className="mr-2">{getStatusIcon(camera.status)}</span>
                                                            <h5 className="font-medium">{camera.name}</h5>
                                                        </div>
                                                        <p className="text-sm opacity-75">{camera.ip_address}</p>
                                                        <p className="text-xs mt-1">{camera.brand} {camera.model}</p>
                                                        {camera.last_ping_at && (
                                                            <p className="text-xs opacity-60">
                                                                Last ping: {new Date(camera.last_ping_at).toLocaleString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {camera.status === 'online' && (
                                                        <button className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                                                            📺 Stream
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Camera Stream Modal */}
                {selectedCamera && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    📹 {selectedCamera.name}
                                </h3>
                                <button 
                                    onClick={() => setSelectedCamera(null)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="text-4xl mb-4">📹</div>
                                    <p>Live Stream Placeholder</p>
                                    <p className="text-sm opacity-75 mt-2">
                                        Stream URL: {selectedCamera.hls_url}
                                    </p>
                                    <p className="text-sm opacity-75">
                                        Status: {getStatusIcon(selectedCamera.status)} {selectedCamera.status}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>IP: {selectedCamera.ip_address}</span>
                                <span>{selectedCamera.brand} {selectedCamera.model}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}