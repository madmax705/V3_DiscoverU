import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote?: string;
  name?: string;
  role?: string;
  avatarUrl?: string;
}

const TestimonialCard = ({
  quote = "Joining the robotics club has been an amazing experience. I've learned so much and made great friends!",
  name = "Alex Chen",
  role = "Club Member",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
}: TestimonialCardProps) => {
  return (
    <Card className="relative h-full bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden">
      <CardContent className="pt-6">
        <Quote className="absolute top-4 left-4 w-8 h-8 text-blue-500/20" />
        <div className="space-y-4">
          <p className="text-gray-600 italic relative z-10 text-lg">{quote}</p>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-gray-500">{role}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
