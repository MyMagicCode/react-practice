import React from "react";
import useMutateObserver from "../hook/useMutateObserver";

interface MutateObserverProps {
  onMutate: MutationCallback;
  options?: MutationObserverInit;
  children: React.ReactElement;
}

const MutateObserver = (props: MutateObserverProps) => {
  const { children, options, onMutate } = props;
  const ref = React.useRef<HTMLElement>(null);

  useMutateObserver(ref, onMutate, options);

  if (!children) return null;

  const child = React.cloneElement(children, { ref: ref });
  return child;
};

export default MutateObserver;
