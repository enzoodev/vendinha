import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  children: ReactNode;
}

export function BorderlessButton({ children, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.6} {...rest}>
      {children}
    </TouchableOpacity>
  );
}
