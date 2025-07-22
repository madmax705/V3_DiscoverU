import React, { useState, useEffect } from "react";
import { useNotifications } from "../contexts/NotificationContext";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Bell,
  Check,
  CheckCheck,
  Clock,
  Settings,
  Trash2,
  X,
  Calendar,
  Users,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import BouncingDotsLoader from "./BouncingDotsLoader";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();
  const navigate = useNavigate();
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const handleNotificationClick = async (notification: any) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }

    if (notification.action_url) {
      navigate(notification.action_url);
      onClose();
    }
  };

  const handleDelete = async (notificationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingIds((prev) => new Set(prev).add(notificationId));
    await deleteNotification(notificationId);
    setDeletingIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(notificationId);
      return newSet;
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "event_reminder":
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case "club_update":
        return <Users className="w-4 h-4 text-green-600" />;
      case "new_event":
        return <Clock className="w-4 h-4 text-purple-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "event_reminder":
        return "border-l-blue-500";
      case "club_update":
        return "border-l-green-500";
      case "new_event":
        return "border-l-purple-500";
      default:
        return "border-l-gray-500";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="fixed right-4 top-16 w-96 max-h-[80vh] bg-white rounded-lg shadow-xl border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  <CheckCheck className="w-4 h-4 mr-1" />
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-[400px]">
            {loading ? (
              <BouncingDotsLoader />
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No notifications
                </h3>
                <p className="text-gray-500 text-sm">
                  You're all caught up! We'll notify you when there are new
                  updates.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`group relative p-4 border-l-4 cursor-pointer transition-colors hover:bg-gray-50 ${getNotificationColor(
                      notification.type,
                    )} ${!notification.read ? "bg-blue-50/50" : "bg-white"
                      } ${deletingIds.has(notification.id) ? "opacity-50" : ""}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 ml-2 mt-1"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(
                              new Date(notification.created_at),
                              {
                                addSuffix: true,
                              },
                            )}
                          </span>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => handleDelete(notification.id, e)}
                              className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                              disabled={deletingIds.has(notification.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>

        {notifications.length > 0 && (
          <div className="p-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigate("/profile");
                onClose();
              }}
              className="w-full flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Notification Settings
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
