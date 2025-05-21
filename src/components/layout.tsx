import { AuroraBackground } from "./ui/aurora-background";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <AuroraBackground>
      {isHomePage && (
        <div
          className="blob-container"
          title="Interactive blob - hover to see effect"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1300"
            height="980"
            viewBox="0 0 1578 1286"
            fill="none"
            style={{ overflow: "visible" }}
          >
            <defs>
              <filter id="blendFilter">
                <feBlend
                  mode="multiply"
                  in="SourceGraphic"
                  in2="BackgroundImage"
                  result="blend"
                />
                <feFlood floodColor="#0037FF" result="fill" />
                <feComposite
                  in="fill"
                  in2="blend"
                  operator="in"
                  result="coloredOverlap"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="coloredOverlap"
                  result="finalBlend"
                />
              </filter>
            </defs>
            <g filter="url(#blendFilter)">
              {/* purple blob first */}
              <path
                className="blob--purple"
                d="M1040.199 -141.7
                   L1509.73 -33.2747
                   C1540.97 -26.0606 1560.44  5.10148 1553.22 36.3415
                   L1444.8 505.868
                   C1433.17 556.223 1366.43 567.428 1339.02 523.561
                   L977.918 -54.3902
                   C950.51 -98.2564 989.798 -153.338 1040.199 -141.7
                   Z"
              />

              {/* blue blob second */}
              <path
                className="blob--blue"
                d="M1095.14 290.82
                   C987.352 269.254 874.719 327.964 834.942 438.111
                   C797.458 541.915 841.045 659.741 937.044 714.078
                   C1038.16 771.355 1160.58 743.493 1228.68 658.816
                   C1336.47 680.383 1449.1 621.672 1488.88 511.525
                   C1526.36 407.722 1482.78 289.896 1386.78 235.558
                   C1285.71 178.302 1163.29 206.164 1095.14 290.82
                   Z"
              />
            </g>
          </svg>
        </div>
      )}
      <div className="min-h-screen relative z-10">{children}</div>
    </AuroraBackground>
  );
};

export default Layout;
