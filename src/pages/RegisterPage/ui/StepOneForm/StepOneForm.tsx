import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useEffect, useState } from 'react';
import { VStack } from 'shared/UI/Stack';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { YupInput } from 'widgets/YupInput';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/UI/Button';
import classes from './StepOneForm.module.scss';

interface StepOneFormProps {
    onSubmitStep: (data: FieldValues) => void;
    isLoading?: boolean;
}

export const StepOneForm = memo((props: StepOneFormProps) => {
    const {
        onSubmitStep,
        isLoading,
    } = props;

    const { t } = useTranslation('RegisterPage');
    const [registerType, setRegisterType] = useState <boolean>(true);

    const SignupSchema = Yup.object({
        email: registerType
            ? Yup.string()
            : Yup.string()
                .email('Неправильно введена почта')
                .required('Обязательное поле'),

        phoneNumber: registerType
            ? Yup.string()
                .matches(/^\d{11}$/, 'Неправильно введен номер телефона')
                .required('Обязательное поле')
            : Yup.string(),
    }).required();

    const {
        register, setValue, watch, formState: { errors }, handleSubmit,
    } = useForm({
        resolver: yupResolver(SignupSchema),
    });

    useEffect(() => {
        if (watch('email') && !watch('phoneNumber')) {
            setRegisterType(false);
        } else {
            setRegisterType(true);
        }
    }, [watch('email'), watch('phoneNumber')]);

    const onSubmit = handleSubmit((data) => {
        onSubmitStep(data);
    });

    return (
        <VStack className={classes.formWrapper} gap="4" justify="start" align="center">
            <p className={classes.subtitle}>
                Займет не более
                {' '}
                <b>5 минут</b>
                {',\n '}
                а в будущем сэкономит часы!
            </p>
            <form
                onSubmit={onSubmit}
                className={classes.Form}
            >
                <YupInput
                    placeholder={t('Email') as string}
                    className={classNames(classes.input, {
                        [classes.error]: !!errors.phoneNumber,
                    })}
                    watch={watch}
                    setValue={setValue}
                    register={register}
                    name="email"
                    // @ts-ignore
                    errors={errors}
                    disabled={isLoading}
                />

                <p className={classes.orWrapper}>{t('или')}</p>

                <YupInput
                    placeholder={t('Номер телефона') as string}
                    className={classNames(classes.input, {
                        [classes.error]: !!errors.phoneNumber,
                    })}
                    watch={watch}
                    setValue={setValue}
                    register={register}
                    name="phoneNumber"
                    // @ts-ignore
                    errors={errors}
                    disabled={isLoading}
                />

                <p className={classes.sendWrapper}>
                    {t('На него мы отправим код')}
                    <b>{t('подтверждения')}</b>
                    .
                </p>

                <Button
                    style={{ width: '100%' }}
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? t('Подождите...') : t('Далее')}
                </Button>
            </form>
        </VStack>
    );
});
