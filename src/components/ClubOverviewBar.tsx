import React, { useState } from 'react';
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { Calendar } from "./ui/calendar";
import { Progress } from "./ui/progress";
import { Search, Plus, Edit, CalendarDays } from "lucide-react";
import { cn } from "../lib/utils";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface ClubOverviewBarProps {
    userName?: string;
    avatarUrl?: string;
}

// Calendar event types
type EventType = 'current' | 'done' | 'scheduled';
interface DayEvent {
    type: EventType;
    title: string;
}

const ClubOverviewBar: React.FC<ClubOverviewBarProps> = ({
    userName = "Amanda",
    avatarUrl = "/Characters/character_1.png"
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedEvents, setSelectedEvents] = useState<DayEvent[]>([]);

    // Mock data for demonstration
    const eventStats = {
        activityTimeHours: 2.3,
        caloriesIntake: 1875,
        caloriesBurned: 850
    };

    // Mock calendar events data
    const eventDates: Record<string, DayEvent[]> = {
        [new Date().toDateString()]: [
            { type: 'current', title: 'Tech Team Meeting' }
        ],
        [new Date(2024, 5, 3).toDateString()]: [
            { type: 'done', title: 'Club Leadership Workshop' }
        ],
        [new Date(2024, 5, 10).toDateString()]: [
            { type: 'scheduled', title: 'Annual Club Fair' }
        ],
    };

    const clubList = [
        {
            name: "Stretching",
            role: "Trainer: Alice McCain",
            sessionsCompleted: 9,
            sessionsTotal: 12
        },
        {
            name: "Yoga training",
            role: "Trainer: Jennifer Lubin",
            sessionsCompleted: 6,
            sessionsTotal: 10
        }
    ];

    // Calendar helper functions
    const getDayEvents = (date: Date): DayEvent[] => {
        return eventDates[date.toDateString()] || [];
    };

    const getDayClass = (date: Date): string => {
        const events = getDayEvents(date);
        if (events.length === 0) return "";

        const eventType = events[0].type;
        return {
            current: "bg-yellow-200 text-yellow-900",
            done: "bg-blue-200 text-blue-900",
            scheduled: "bg-green-200 text-green-900"
        }[eventType] || "";
    };

    // Handle date selection
    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date) {
            setSelectedEvents(getDayEvents(date));
        } else {
            setSelectedEvents([]);
        }
    };

    return (
        <Card className="w-full rounded-2xl p-0">
            <div className="w-full bg-[#E5E0DA] rounded-2xl p-10 space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Hi, {userName}!</h1>
                        <p className="text-gray-600">Let's take a look at your activity today</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search for club data"
                                className="pl-10 pr-4 w-64"
                            />
                        </div>
                        <Button className="bg-black text-white rounded-full hover:bg-gray-800">
                            Upgrade
                        </Button>
                    </div>
                </div>

                {/* Overview Cards Grid */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Events Summary Card */}
                    <Card className="col-span-4 p-6">
                        <h3 className="text-lg font-semibold mb-4">Your Events</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>Activity Time</span>
                                <span className="font-bold">{eventStats.activityTimeHours}h</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Events Attended</span>
                                <span className="font-bold">{eventStats.caloriesIntake}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Upcoming Events</span>
                                <span className="font-bold">{eventStats.caloriesBurned}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Enhanced Club Event Calendar Card */}
                    <Card className="col-span-4 p-6">
                        <h3 className="text-lg font-semibold mb-4">Your Club Event Dates</h3>
                        <div className="space-y-4">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleDateSelect}
                                className="rounded-md border"
                                modifiers={{
                                    hasEvent: (date) => getDayEvents(date).length > 0
                                }}
                                modifiersClassNames={{
                                    hasEvent: "font-bold"
                                }}
                                components={{
                                    Day: ({ date, ...props }: any) => (
                                        <button
                                            {...props}
                                            className={cn(
                                                props.className,
                                                getDayClass(date),
                                                "relative hover:bg-gray-100 rounded-full w-8 h-8 p-0 font-normal aria-selected:opacity-100"
                                            )}
                                        >
                                            {date.getDate()}
                                            {getDayEvents(date).length > 0 && (
                                                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-current" />
                                            )}
                                        </button>
                                    )
                                }}
                            />

                            {/* Event Legend */}
                            <div className="flex gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-yellow-200" />
                                    <span>Current</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-200" />
                                    <span>Done</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-200" />
                                    <span>Scheduled</span>
                                </div>
                            </div>

                            {/* Selected Date Events */}
                            <AnimatePresence mode="wait">
                                {selectedEvents.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-2"
                                    >
                                        <h4 className="font-medium">Events on {selectedDate?.toLocaleDateString()}</h4>
                                        {selectedEvents.map((event, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm"
                                            >
                                                <CalendarDays className="w-4 h-4" />
                                                <span>{event.title}</span>
                                                <Badge variant="outline" className="ml-auto">
                                                    {event.type}
                                                </Badge>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Card>

                    {/* Joined Days Progress Card with Animation */}
                    <Card className="col-span-4 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Days you've Joined</h3>
                            <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Change Goal
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "61%" }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
                                <Progress value={61} className="h-2" />
                            </motion.div>
                            <div className="flex justify-between text-sm">
                                <span>5201 days</span>
                                <span>Goal: 8500 days</span>
                            </div>
                        </div>
                    </Card>

                    {/* Club List Card with Animated Progress */}
                    <Card className="col-span-12 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">My Clubs</h3>
                            <Button variant="outline" size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Add New
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {clubList.map((club, index) => (
                                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium">{club.name}</h4>
                                        <p className="text-sm text-gray-600">{club.role}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "8rem" }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        >
                                            <Progress
                                                value={(club.sessionsCompleted / club.sessionsTotal) * 100}
                                                className="w-32 h-2"
                                            />
                                        </motion.div>
                                        <span className="text-sm">
                                            {club.sessionsCompleted}/{club.sessionsTotal}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Card>
    );
};

export default ClubOverviewBar;
