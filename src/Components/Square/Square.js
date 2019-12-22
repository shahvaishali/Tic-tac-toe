import React from "react";

export default function Square(props) {
  return (
    <div className={props.style} onClick={props.onClick}>
        {props.value}
    </div>
  );
}
