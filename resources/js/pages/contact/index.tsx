import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import React from 'react';

interface Contact {
    id: number;
    name: string;
    phone: string | null;
    whatsapp: string | null;
    whatsapp_url: string | null;
    email: string | null;
    instagram: string | null;
    instagram_url: string | null;
    address: string | null;
    position: string | null;
    department: string | null;
}

interface Props {
    contacts: Contact[];
    [key: string]: unknown;
}

export default function ContactIndex({ contacts }: Props) {
    const getDepartmentIcon = (department: string | null) => {
        switch (department) {
            case 'Security': return '🛡️';
            case 'Operations': return '⚙️';
            case 'Maintenance': return '🔧';
            case 'Engineering': return '🏗️';
            case 'HSE': return '🦺';
            case 'IT': return '💻';
            default: return '👤';
        }
    };

    const getDepartmentColor = (department: string | null) => {
        switch (department) {
            case 'Security': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            case 'Operations': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            case 'Maintenance': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'Engineering': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
            case 'HSE': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'IT': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const groupedContacts = contacts.reduce((groups, contact) => {
        const dept = contact.department || 'Other';
        if (!groups[dept]) {
            groups[dept] = [];
        }
        groups[dept].push(contact);
        return groups;
    }, {} as Record<string, Contact[]>);

    return (
        <AppShell>
            <Head title="Emergency Contacts - CCTV Monitoring" />
            
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center">
                        <span className="text-2xl mr-2">📞</span>
                        Emergency Contacts
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Kilang Pertamina Internasional - Refinery Unit VI Balongan
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Quick access to key personnel for security and operational support
                    </p>
                </div>

                {/* Contact Stats */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">
                                {contacts.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Contacts
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">
                                {contacts.filter(c => c.whatsapp).length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                WhatsApp Available
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-600">
                                {contacts.filter(c => c.email).length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Email Available
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-orange-600">
                                {Object.keys(groupedContacts).length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Departments
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contacts by Department */}
                <div className="space-y-8">
                    {Object.entries(groupedContacts).map(([department, departmentContacts]) => (
                        <div key={department} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            {/* Department Header */}
                            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                                    <span className="text-2xl mr-3">{getDepartmentIcon(department)}</span>
                                    {department} Department
                                    <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getDepartmentColor(department)}`}>
                                        {departmentContacts.length} contacts
                                    </span>
                                </h2>
                            </div>

                            {/* Department Contacts */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {departmentContacts.map((contact) => (
                                        <div 
                                            key={contact.id} 
                                            className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200"
                                        >
                                            {/* Contact Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                        {contact.name}
                                                    </h3>
                                                    {contact.position && (
                                                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                            {contact.position}
                                                        </p>
                                                    )}
                                                </div>
                                                <span className={`px-2 py-1 text-xs font-medium rounded ${getDepartmentColor(contact.department)}`}>
                                                    {contact.department}
                                                </span>
                                            </div>

                                            {/* Contact Information */}
                                            <div className="space-y-3">
                                                {/* Phone */}
                                                {contact.phone && (
                                                    <div className="flex items-center">
                                                        <div className="text-lg mr-3">📱</div>
                                                        <div className="flex-1">
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                                            <a 
                                                                href={`tel:${contact.phone}`}
                                                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                                            >
                                                                {contact.phone}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* WhatsApp */}
                                                {contact.whatsapp && (
                                                    <div className="flex items-center">
                                                        <div className="text-lg mr-3">💬</div>
                                                        <div className="flex-1">
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">WhatsApp</p>
                                                            <a 
                                                                href={contact.whatsapp_url || '#'}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-green-600 dark:text-green-400 hover:underline font-medium"
                                                            >
                                                                {contact.whatsapp}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Email */}
                                                {contact.email && (
                                                    <div className="flex items-center">
                                                        <div className="text-lg mr-3">✉️</div>
                                                        <div className="flex-1">
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                                            <a 
                                                                href={`mailto:${contact.email}`}
                                                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium break-all"
                                                            >
                                                                {contact.email}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Instagram */}
                                                {contact.instagram && (
                                                    <div className="flex items-center">
                                                        <div className="text-lg mr-3">📸</div>
                                                        <div className="flex-1">
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">Instagram</p>
                                                            <a 
                                                                href={contact.instagram_url || '#'}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
                                                            >
                                                                {contact.instagram}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Address */}
                                                {contact.address && (
                                                    <div className="flex items-start">
                                                        <div className="text-lg mr-3 mt-1">📍</div>
                                                        <div className="flex-1">
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                                                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                                                {contact.address}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Quick Actions */}
                                            <div className="mt-6 flex space-x-2">
                                                {contact.phone && (
                                                    <a 
                                                        href={`tel:${contact.phone}`}
                                                        className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                                    >
                                                        📱 Call
                                                    </a>
                                                )}
                                                {contact.whatsapp_url && (
                                                    <a 
                                                        href={contact.whatsapp_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 bg-green-600 text-white text-center py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                                    >
                                                        💬 WhatsApp
                                                    </a>
                                                )}
                                                {contact.email && (
                                                    <a 
                                                        href={`mailto:${contact.email}`}
                                                        className="flex-1 bg-gray-600 text-white text-center py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                                                    >
                                                        ✉️ Email
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Emergency Notice */}
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                    <div className="flex items-start">
                        <div className="text-2xl mr-4">🚨</div>
                        <div>
                            <h3 className="text-lg font-bold text-red-900 dark:text-red-300 mb-2">
                                Emergency Procedures
                            </h3>
                            <div className="text-red-800 dark:text-red-200 space-y-2 text-sm">
                                <p><strong>Fire Emergency:</strong> Call Security Department immediately</p>
                                <p><strong>Security Incident:</strong> Contact Security Manager or Operations</p>
                                <p><strong>Medical Emergency:</strong> Call emergency services and notify HSE Coordinator</p>
                                <p><strong>Equipment Failure:</strong> Contact Maintenance Department</p>
                                <p><strong>IT Issues:</strong> Contact IT Support for system-related problems</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                    <p>📍 Kilang Pertamina Internasional - Refinery Unit VI Balongan</p>
                    <p className="mt-1">For immediate assistance, prioritize phone and WhatsApp contacts</p>
                </div>
            </div>
        </AppShell>
    );
}