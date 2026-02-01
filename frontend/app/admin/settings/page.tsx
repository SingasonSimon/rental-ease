"use client";

import { useState } from "react";
import { Settings, Bell, Shield, Mail, Database, Save, Key, Globe } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    const tabs = [
        { id: "general", label: "General", icon: Settings },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "security", label: "Security", icon: Shield },
        { id: "integrations", label: "Integrations", icon: Key },
    ];

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="System Settings"
                description="Configure system preferences and integrations"
            />

            <div className="flex-1 p-6 overflow-auto">
                <div className="flex gap-6">
                    {/* Sidebar Tabs */}
                    <div className="w-56 space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <tab.icon className="h-5 w-5" />
                                <span className="text-sm font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 max-w-3xl">
                        {activeTab === "general" && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Globe className="h-5 w-5" /> General Settings
                                    </CardTitle>
                                    <CardDescription>Basic system configuration</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">System Name</label>
                                        <Input defaultValue="Rental Management System" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Contact Email</label>
                                        <Input type="email" defaultValue="admin@rental.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Support Phone</label>
                                        <Input defaultValue="+254 700 000 000" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Default Currency</label>
                                        <Select defaultValue="KES">
                                            <option value="KES">KES - Kenyan Shilling</option>
                                            <option value="USD">USD - US Dollar</option>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Timezone</label>
                                        <Select defaultValue="Africa/Nairobi">
                                            <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                                            <option value="UTC">UTC</option>
                                        </Select>
                                    </div>
                                    <Button>
                                        <Save className="h-4 w-4 mr-2" /> Save Changes
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === "notifications" && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Bell className="h-5 w-5" /> Notification Settings
                                    </CardTitle>
                                    <CardDescription>Configure email and system notifications</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        {[
                                            { label: "Payment Received", desc: "Notify when a payment is completed" },
                                            { label: "New Application", desc: "Notify when a new rental application is submitted" },
                                            { label: "Lease Expiring", desc: "Notify 30 days before a lease expires" },
                                            { label: "Maintenance Request", desc: "Notify when a new maintenance request is submitted" },
                                            { label: "Payment Overdue", desc: "Notify when rent payment is overdue" },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <p className="font-medium">{item.label}</p>
                                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <Button>
                                        <Save className="h-4 w-4 mr-2" /> Save Changes
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === "security" && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="h-5 w-5" /> Security Settings
                                    </CardTitle>
                                    <CardDescription>Configure authentication and access control</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Session Timeout (minutes)</label>
                                        <Input type="number" defaultValue="30" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Password Minimum Length</label>
                                        <Input type="number" defaultValue="8" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <p className="font-medium">Require Strong Passwords</p>
                                            <p className="text-sm text-muted-foreground">Must include uppercase, lowercase, number, and symbol</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <p className="font-medium">Two-Factor Authentication</p>
                                            <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                        </label>
                                    </div>
                                    <Button>
                                        <Save className="h-4 w-4 mr-2" /> Save Changes
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === "integrations" && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Key className="h-5 w-5" /> API Integrations
                                    </CardTitle>
                                    <CardDescription>Configure external service connections</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="p-4 border rounded-lg space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                                                    <span className="font-bold text-green-600">M</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium">M-Pesa API</p>
                                                    <p className="text-sm text-muted-foreground">Safaricom payment gateway</p>
                                                </div>
                                            </div>
                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Connected</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Consumer Key</label>
                                            <Input type="password" defaultValue="•••••••••••••••••" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Consumer Secret</label>
                                            <Input type="password" defaultValue="•••••••••••••••••" />
                                        </div>
                                    </div>

                                    <div className="p-4 border rounded-lg space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                                    <Mail className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">SendGrid</p>
                                                    <p className="text-sm text-muted-foreground">Email service provider</p>
                                                </div>
                                            </div>
                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Connected</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">API Key</label>
                                            <Input type="password" defaultValue="•••••••••••••••••" />
                                        </div>
                                    </div>

                                    <div className="p-4 border rounded-lg space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                                    <Database className="h-5 w-5 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Cloudinary</p>
                                                    <p className="text-sm text-muted-foreground">File storage service</p>
                                                </div>
                                            </div>
                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Connected</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Cloud Name</label>
                                            <Input defaultValue="rental-management" />
                                        </div>
                                    </div>

                                    <Button>
                                        <Save className="h-4 w-4 mr-2" /> Save Changes
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
