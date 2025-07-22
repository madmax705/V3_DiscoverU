import React, { useState } from "react";
import { useNotifications } from "../contexts/NotificationContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Bell, Save, Clock, Mail, Smartphone } from "lucide-react";
import PulseLoader from "./PulseLoader";

const NotificationSettings = () => {
  const { preferences, updatePreferences } = useNotifications();
  const [saving, setSaving] = useState(false);
  const [localPreferences, setLocalPreferences] = useState(preferences);

  React.useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  const handleSave = async () => {
    if (!localPreferences) return;

    setSaving(true);
    try {
      await updatePreferences(localPreferences);
    } catch (error) {
      console.error("Error saving notification preferences:", error);
    } finally {
      setSaving(false);
    }
  };

  const updateLocalPreference = (key: string, value: any) => {
    setLocalPreferences((prev) => ({
      ...prev!,
      [key]: value,
    }));
  };

  if (!localPreferences) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <PulseLoader size="medium" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notification Types */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notification Types</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Event Reminders</Label>
              <p className="text-xs text-gray-600">
                Get notified about upcoming events for your clubs
              </p>
            </div>
            <Switch
              checked={localPreferences.event_reminders}
              onCheckedChange={(checked) =>
                updateLocalPreference("event_reminders", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Club Updates</Label>
              <p className="text-xs text-gray-600">
                Receive updates about your joined clubs
              </p>
            </div>
            <Switch
              checked={localPreferences.club_updates}
              onCheckedChange={(checked) =>
                updateLocalPreference("club_updates", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium">New Events</Label>
              <p className="text-xs text-gray-600">
                Get notified when new events are added to your clubs
              </p>
            </div>
            <Switch
              checked={localPreferences.new_events}
              onCheckedChange={(checked) =>
                updateLocalPreference("new_events", checked)
              }
            />
          </div>
        </div>

        {/* Reminder Timing */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Reminder Timing
          </h3>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              When to remind me about events
            </Label>
            <Select
              value={localPreferences.reminder_timing}
              onValueChange={(value) =>
                updateLocalPreference("reminder_timing", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1_hour">1 hour before</SelectItem>
                <SelectItem value="3_hours">3 hours before</SelectItem>
                <SelectItem value="1_day">1 day before</SelectItem>
                <SelectItem value="3_days">3 days before</SelectItem>
                <SelectItem value="1_week">1 week before</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Delivery Methods */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Delivery Methods</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-1 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <div>
                <Label className="text-sm font-medium">
                  Push Notifications
                </Label>
                <p className="text-xs text-gray-600">
                  Receive notifications in the app
                </p>
              </div>
            </div>
            <Switch
              checked={localPreferences.push_notifications}
              onCheckedChange={(checked) =>
                updateLocalPreference("push_notifications", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-green-600" />
              <div>
                <Label className="text-sm font-medium">
                  Email Notifications
                </Label>
                <p className="text-xs text-gray-600">
                  Receive notifications via email
                </p>
              </div>
            </div>
            <Switch
              checked={localPreferences.email_notifications}
              onCheckedChange={(checked) =>
                updateLocalPreference("email_notifications", checked)
              }
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
