import React from "react";

export default function Square(props) {
  return (
    <div className={props.style} onClick={props.onClick}>
        <div className={props.blink_style}>
          {props.value}
        </div>
    </div>
  );
}
