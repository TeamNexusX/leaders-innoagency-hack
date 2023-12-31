/* eslint-disable fsd-path-checker-keyready/path-checker-fsd */
import { classNames } from 'shared/lib/classNames/classNames';
import React, { HTMLAttributes, memo, ReactNode } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import classes from './Card.module.scss';

export enum CardSize {
    NORMAL = 'normal',
    EXPAND = 'expand'
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    size?: CardSize;
}

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        size = CardSize.NORMAL,
        ...otherProps
    } = props;

    if (size === CardSize.NORMAL) {
        return (
            <HStack
                className={classNames(classes.normal, {}, [className])}
                max
                gap="32"
                justify="center"
                align="center"
            >
                {children}
            </HStack>
        );
    }

    return (
        <VStack
            className={classNames(classes.expand, {}, [className])}
            gap="8"
            align="center"
            justify="center"
            {...otherProps}
        >
            {children}
        </VStack>
    );
});
