import TestimonialCard from "./TestimonialCard";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarUrl: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

const TestimonialsSection = ({
  testimonials = [
    {
      quote:
        "The debate club has helped me develop confidence and critical thinking skills. It's been transformative!",
      name: "Sarah Lee",
      role: "Debate Club President",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      quote:
        "Being part of the environmental club has allowed me to make a real difference in our community.",
      name: "Michael Zhang",
      role: "Environmental Club Member",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      quote:
        "The art society has given me a creative outlet and a supportive community of fellow artists.",
      name: "Emma Wilson",
      role: "Art Society Secretary",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
  ],
}: TestimonialsSectionProps) => {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-transparent to-blue-50/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Members Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
