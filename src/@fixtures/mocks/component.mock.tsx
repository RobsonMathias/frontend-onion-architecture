import React from 'react';

export function Mock() {
  return <div />;
}

export const mockComponent = (componentsName: string[] = []) => {
  let composed: { [key: string]: React.ReactNode } = {};
  componentsName.forEach((name: string) => {
    composed[name] = Mock;
  });
  return composed;
};
