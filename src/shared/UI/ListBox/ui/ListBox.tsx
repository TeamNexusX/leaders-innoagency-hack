/* eslint-disable fsd-path-checker-keyready/path-checker-fsd */
import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/UI/Stack';
import ExpandIcon from 'shared/assets/icons/expand_arrow.svg';
import { ListBoxDirections } from 'shared/types/ui';
import { Button } from 'shared/UI/Button';
import classes from './ListBox.module.scss';

export interface ListBoxItems {
    value?: string;
    content?: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    items: ListBoxItems[];
    className?: string;
    onChange: (value: string) => void;
    value?: string;
    defaultValue?: string;
    direction?: ListBoxDirections
}

const directionsMapper: Record<ListBoxDirections, string> = {
    'bottom left': classes.directionBottomLeft,
    'top left': classes.directionsTopLeft,
    'bottom right': classes.directionBottomRight,
    'top right': classes.directionsTopRight,
};

export const ListBox = (props: ListBoxProps) => {
    const {
        className,
        items,
        defaultValue,
        value,
        onChange,
        direction = 'bottom right',
    } = props;

    const directionsClasses = [directionsMapper[direction]];

    return (
        <HListBox
            as="div"
            className={classNames(classes.listbox, {}, [className])}
            value={value}
            onChange={onChange}
        >
            <HListBox.Button
                as={Fragment}
            >
                <Button variant="primary">
                    <HStack justify="between" gap="4">
                        {value || defaultValue}
                        <ExpandIcon width={25} height={25} />
                    </HStack>
                </Button>
            </HListBox.Button>
            <HListBox.Options
                className={classNames(classes.options, {}, directionsClasses)}
            >
                {items.map((item) => (
                    <HListBox.Option
                        key={item.value}
                        as={Fragment}
                        value={item.value}
                        disabled={item.disabled}
                    >
                        {({ active, selected, disabled }) => (
                            <li
                                className={classNames(
                                    classes.item,
                                    {
                                        [classes.active]: active,
                                        [classes.selected]: selected,
                                        [classes.disabled]: disabled,
                                    },
                                    [],
                                )}
                            >
                                {item.content}
                            </li>
                        )}
                    </HListBox.Option>
                ))}
            </HListBox.Options>
        </HListBox>
    );
};
