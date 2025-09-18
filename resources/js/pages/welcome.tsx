import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="CCTV Monitoring - Kilang Pertamina Internasional">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>
            
            {/* Background Image */}
            <div 
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(/images/kilang.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="relative z-10 flex min-h-screen flex-col">
                {/* Header */}
                <header className="relative z-20 w-full">
                    <nav className="container mx-auto flex items-center justify-between px-6 py-4">
                        {/* Logo */}
                        <div className="flex items-center space-x-4">
                            <img 
                                src="/images/logo-Pertamina.png" 
                                alt="Pertamina Logo" 
                                className="h-12 w-auto"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            <div className="text-white">
                                <h1 className="text-xl font-bold">KILANG PERTAMINA INTERNASIONAL</h1>
                                <p className="text-sm opacity-90">Refinery Unit VI Balongan</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-blue-600 px-6 py-2.5 text-white font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg border-2 border-white px-6 py-2.5 text-white font-medium hover:bg-white hover:text-gray-900 transition-all duration-200"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-red-600 px-6 py-2.5 text-white font-medium hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center px-6">
                    <div className="text-center text-white max-w-4xl mx-auto">
                        {/* Hero Section */}
                        <div className="mb-12">
                            <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 rounded-full border border-blue-400/30 mb-6">
                                <span className="text-blue-300 text-sm font-medium">🛡️ Advanced CCTV Monitoring System</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                Monitoring CCTV
                                <span className="block text-blue-400">Kilang Pertamina</span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
                                Real-time security surveillance system for PT Kilang Pertamina Internasional - 
                                Refinery Unit VI Balongan with advanced monitoring capabilities
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className="text-3xl mb-4">📹</div>
                                <h3 className="text-xl font-bold mb-2">700+ CCTV Cameras</h3>
                                <p className="text-gray-300">Comprehensive coverage across 18 buildings with real-time monitoring</p>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className="text-3xl mb-4">🗺️</div>
                                <h3 className="text-xl font-bold mb-2">Interactive Maps</h3>
                                <p className="text-gray-300">Leaflet-based maps with OpenStreetMap and Satellite views</p>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className="text-3xl mb-4">⚡</div>
                                <h3 className="text-xl font-bold mb-2">Real-time Streaming</h3>
                                <p className="text-gray-300">Live RTSP to HLS conversion with automatic FFmpeg processing</p>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className="text-3xl mb-4">📊</div>
                                <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
                                <p className="text-gray-300">Comprehensive statistics and reporting with Excel export</p>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className="text-3xl mb-4">🔐</div>
                                <h3 className="text-xl font-bold mb-2">Role-based Access</h3>
                                <p className="text-gray-300">Admin panel and user interface with secure authentication</p>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className="text-3xl mb-4">🔔</div>
                                <h3 className="text-xl font-bold mb-2">Smart Notifications</h3>
                                <p className="text-gray-300">Real-time alerts and messaging system with email notifications</p>
                            </div>
                        </div>

                        {/* Status Indicators */}
                        <div className="flex justify-center space-x-8 mb-12 text-sm">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                <span>System Online</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                                <span>Real-time Monitoring</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                                <span>24/7 Security</span>
                            </div>
                        </div>

                        {/* CTA Section */}
                        {!auth.user && (
                            <div className="space-y-4">
                                <p className="text-lg text-gray-300 mb-6">
                                    Access the complete CCTV monitoring dashboard
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        <span className="mr-2">🔐</span>
                                        Login to Dashboard
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        <span className="mr-2">👤</span>
                                        Create Account
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative z-20 text-center py-8 text-white/70">
                    <p>&copy; 2024 Kilang Pertamina Internasional - Refinery Unit VI Balongan. All rights reserved.</p>
                    <p className="text-sm mt-2">Advanced CCTV Monitoring System - Secure • Real-time • Reliable</p>
                </footer>
            </div>
        </>
    );
}