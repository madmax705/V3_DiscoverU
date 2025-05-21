interface AuroraBackgroundProps {
  children: React.ReactNode;
}

export const AuroraBackground = ({ children }: AuroraBackgroundProps) => {
  return (
    <div className="relative">
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div
          className="absolute -inset-[10px]"
          style={{
            background: "white",
          }}
        />
      </div>
      {children}
    </div>
  );
};
