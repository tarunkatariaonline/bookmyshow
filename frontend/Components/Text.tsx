import { cn } from '@/utils/cn';
import React from 'react';
import { Text as RNText, useColorScheme } from 'react-native';
type TextProps = {
    children: React.ReactNode;
    className?: string | undefined
};
const Text = ({ children, className }: TextProps) => {
     const isLight = useColorScheme() === "light" ? true : false
    return (
        <RNText className={cn(isLight ?"text-black" :"text-white", className)}>{children}</RNText>
    )
}

export default Text
