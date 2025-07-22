import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

const HeroSection = () => {
  return (
    <div className="container mx-auto px-6 flex flex-col items-center justify-center min-h-[385px] max-w-[1600px] relative overflow-hidden">
      <h1 className="text-4xl md:text-7xl mb-16 text-center leading-tight font-sans font-bold text-blue-600 [text-shadow:_3px_3px_0px_rgb(37_99_235_/_30%),_6px_6px_0px_rgb(37_99_235_/_10%)] relative z-10">
        Discover Your Passion!
      </h1>

      <div className="w-auto -mt-5 relative z-10">
        <CardContainer className="inter-var">
          <CardBody className="relative group/card border rounded-xl bg-transparent px-6 border-blue-400">
            <CardItem
              translateZ="50"
              className="text-xl md:text-2xl text-center py-3"
            >
              <span className="inline-block text-black font-bold">
                Explore all clubs in
              </span>
              <span className="inline-block text-blue-600 ml-2 font-bold">
                SUIS Gubei
              </span>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      {/* This component does not seem to have images that need lazy loading based on its structure. If there are images here, they should be added with loading="lazy". For now, I'm cleaning up the incorrect additions. */}

    </div>
  );
};

export default HeroSection;
