import { Composition } from "remotion";
import { Banner } from "./Banner";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Banner"
      component={Banner}
      durationInFrames={150}
      fps={30}
      width={1584}
      height={396}
    />
  );
};
