import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/UI/Card/Card';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button } from 'shared/UI/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import CancelIcon from 'shared/assets/icons/ban.svg';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteBooking } from 'features/getBookings';
import { Booking } from '../../model/types/BookingSchema';
import classes from './BookingCard.module.scss';

interface BookingCardProps {
    className?: string;
    booking: Booking;
    check?: boolean;
}

export const BookingCard = memo((props: BookingCardProps) => {
    const { className, booking, check = false } = props;

    const { t } = useTranslation('Booking');
    const dispatch = useAppDispatch();

    const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);

    const deleteBookingHandler = useCallback(() => {
        if (!booking._id) {
            alert(t('Не удалось удалить бронирование') as string);
            return;
        }
        dispatch(deleteBooking(booking._id));
    }, [booking._id, dispatch, t]);

    return (
        <Card className={classNames(classes.BookingCard, {}, [className])}>
            <VStack
                gap="16"
                justify="start"
                align="center"
                className={classes.feedbackClasses}
            >
                {check && <h4>{t('Проверьте введенные данные')}</h4>}
                <HStack max>
                    <b>{`${t('Площадка')}:`}</b>
                    <p>{booking.platformTitle}</p>
                </HStack>
                {booking?.date && (
                    <HStack max>
                        <b>{`${t('Дата')}:`}</b>
                        {/* <p>{`${formatDate(booking?.date)}`}</p> */}
                        {/* <p>{`${booking?.date}`}</p> */}
                    </HStack>
                )}
                <HStack max>
                    <b>{`${t('Время')}:`}</b>
                    <p>
                        {/* {`${formatTimeRange({ */}
                        {/*    startTime: booking.startTime, */}
                        {/*    finishTime: booking.endTime, */}
                        {/* })}`} */}
                        {/* <p>{booking?.startTime.toDateString()}</p> */}
                        {/* <p>{booking?.endTime.toDateString()}</p> */}
                    </p>
                </HStack>
                {booking.places && (
                    <HStack gap="8" max justify="start" align="start">
                        <b>{`${t('Места')}:`}</b>
                        <p>{booking.places}</p>
                    </HStack>
                )}
                {booking.body && (
                    <HStack gap="8" max justify="start" align="start">
                        <b>{`${t('Комментарий')}:`}</b>
                        <p style={{ textAlign: 'justify' }}>{booking.body}</p>
                    </HStack>
                )}
                <HStack
                    max
                    justify="end"
                >
                    <Button
                        onMouseEnter={() => setShowDeleteButton(true)}
                        onMouseLeave={() => setShowDeleteButton(false)}
                        onClick={deleteBookingHandler}
                        variant="danger"
                    >
                        <HStack max justify="center" align="center">
                            {showDeleteButton && (
                                <span>{t('Удалить бронирование')}</span>
                            )}
                            <Icon Svg={CancelIcon} className={classes.icon} />
                        </HStack>
                    </Button>
                </HStack>
            </VStack>
        </Card>
    );
});