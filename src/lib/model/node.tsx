import { memo } from "react";
import { Handle, Position, HandleProps } from "reactflow";
import { IconType } from "react-icons";
import styles from "./node.module.css";

type HandleData = {
  kind: string;
  color: string;
  label: string;
  isArray?: boolean;
};

type NodeBaseProperties = {
  disabled?: boolean;

  category: string;
  brandColor?: string;
  label: string;
  icon?: IconType;

  inputs: Array<HandleData>;
  outputs: Array<HandleData>;
};

const CustomHandle = (props: { handle: HandleProps; custom: HandleData }) => {
  const { color, label } = props.custom;

  return (
    <div style={{ position: "relative" }}>
      <Handle style={{ background: color }} {...props.handle} />
      {label}
    </div>
  );
};

const CustomNodeBase = (props: NodeBaseProperties) => {
  const connectable = !props.disabled;

  const inputs = props.inputs.map((input, idx) => (
    <CustomHandle
      key={`${props.category}.${props.label}.target.${idx}`}
      custom={input}
      handle={{
        type: "target",
        position: Position.Left,
        isConnectable: connectable,
        id: `${props.category}.${props.label}.target.${idx}`
          .toLowerCase()
          .replace(/\W+/g, "-"),
      }}
    />
  ));

  const outputs = props.outputs.map((input, idx) => (
    <CustomHandle
      key={`${props.category}.${props.label}.source.${idx}`}
      custom={input}
      handle={{
        type: "source",
        position: Position.Right,
        isConnectable: connectable,
      }}
    />
  ));

  return (
    <div
      className={styles.container}
      style={{ "--brand-color": props.brandColor }}
    >
      <div className={styles.category}>
        <div className={styles.branding}>
          {props.icon && (
            <div className={styles.brandingIcon}>{props.icon({})}</div>
          )}
          <span className={styles.brandingName}>{props.category}</span>
        </div>

        <div className={styles.nodeInfo}>{props.label}</div>
      </div>
      {...inputs}
      {...outputs}
    </div>
  );
};

export default memo(CustomNodeBase);
