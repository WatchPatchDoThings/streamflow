import { memo } from "react";
import "./base.css";

import BaseNode from "../../lib/model/node";
import { FaTwitch } from "react-icons/fa6";

const TwitchBase = () => {
  return (
    <BaseNode
      category="Twitch.tv"
      label="Base Component"
      icon={FaTwitch}
      brandColor="#a970ff"
      inputs={[
        { label: "String", color: "blue", kind: "string", isArray: false },
      ]}
      outputs={[
        { label: "String", color: "blue", kind: "string", isArray: true },
        { label: "Number", color: "green", kind: "number", isArray: false },
        { label: "Boolean", color: "orange", kind: "boolean" },
      ]}
    />
  );
};

export default memo(TwitchBase);
// export default TwitchBase;
