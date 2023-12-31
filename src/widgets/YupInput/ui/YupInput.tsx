/* eslint-disable fsd-path-checker-keyready/path-checker-fsd */
import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    InputHTMLAttributes, memo, MouseEvent, useCallback, useEffect, useState,
} from 'react';
import CrossIcon from 'shared/assets/icons/input-cross.svg';
import SearchIcon from 'shared/assets/icons/search.svg';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Button } from 'shared/UI/Button';
import { HStack, VStack } from 'shared/UI/Stack';
import {
    FieldError, FieldValues, Path, UseFormRegister, UseFormSetValue, UseFormWatch,
} from 'react-hook-form';
import classes from './YupInput.module.scss';

interface InputProps<T extends FieldValues = FieldValues, K extends Path<T> = Path<T>>
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    className?: string;
    placeholder?: string;
    onChange?: (value: string) => void;

    inputType?: string;
    customValue?: string;
    onSubmit?: () => void;

    name: K;
    register: UseFormRegister<T>;
    errors: Record<K, FieldError>;
    watch: UseFormWatch<T>
    setValue: UseFormSetValue<T>;
}

export const YupInput = memo((props: InputProps) => {
    const {
        className,
        onChange,
        placeholder,
        inputType = 'text',
        onSubmit,
        defaultValue,
        customValue,
        disabled,

        name,
        register,
        errors,
        watch,
        setValue,

        ...otherProps
    } = props;

    useEffect(() => {
        document.addEventListener('keypress', (ev) => {
            if (ev.key === 'Enter') {
                onSubmit?.();
            }
        });
    }, [onSubmit]);

    const [isCrossVisible, setIsCrossVisible] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    useEffect(() => {
        if (watch(name) !== '') {
            setIsCrossVisible(true);
            return;
        }
        setIsCrossVisible(false);
    }, [name, watch]);

    const onClearButtonClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setValue?.(name, '');
    }, [name, setValue]);

    const onSubmitClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        onSubmit?.();
    }, [onSubmit]);

    const passwordVisibilityHandler = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsPasswordVisible((prevState) => !prevState);
    }, []);

    const type = () => {
        if (inputType === 'password' && isPasswordVisible) {
            return 'text';
        }
        if (inputType === 'password' && !isPasswordVisible) {
            return 'password';
        }
        return inputType;
    };

    return (
        <VStack className={classNames(classes.InputWrapper, {}, [className])}>
            <input
                placeholder={placeholder}
                type={type()}
                className={classNames(classes.Input, {
                    [classes.error]: !!errors[name],
                })}
                {...register(name)}
                disabled={!!defaultValue || disabled}
                defaultValue={customValue || defaultValue}
                {...otherProps}
            />
            <HStack
                className={classes.btnWrapper}
                justify="end"
                align="center"
            >
                {inputType === 'password' && !disabled && (
                    <Button
                        tabIndex={-1}
                        variant="clear"
                        onClick={passwordVisibilityHandler}
                    >
                        <HStack max align="center">
                            <Icon Svg={EyeIcon} className={classes.icon} />
                        </HStack>
                    </Button>
                )}
                {inputType !== 'password'
                    && isCrossVisible
                    && inputType !== 'date'
                    && !defaultValue
                    && !disabled
                    && (
                        <Button
                            tabIndex={-1}
                            variant="clear"
                            onClick={onClearButtonClick}
                        >
                            <HStack max align="center">
                                <Icon Svg={CrossIcon} className={classes.icon} />
                            </HStack>
                        </Button>
                    )}
                {inputType === 'search' && (
                    <Button
                        tabIndex={-1}
                        variant="clear"
                        onClick={onSubmitClick}
                    >
                        <HStack max align="center">
                            <Icon Svg={SearchIcon} className={classes.icon} />
                        </HStack>
                    </Button>
                )}
            </HStack>
            {errors[name] && (
                <span
                    className={classes.errorMessage}
                >
                    {`${errors[name].message}`}
                </span>
            )}
        </VStack>
    );
});
