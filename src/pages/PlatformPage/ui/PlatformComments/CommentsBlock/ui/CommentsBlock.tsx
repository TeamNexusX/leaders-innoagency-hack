import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { getPlatformData, Platform } from 'entities/Platform';
import { TextArea } from 'shared/UI/TextArea/TextArea';
import { Button } from 'shared/UI/Button';
import { VStack } from 'shared/UI/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addCommentForPlatform } from 'pages/PlatformPage';
import { useSelector } from 'react-redux';
import { getUserAuthData, User } from 'entities/User';
import { Page } from 'widgets/Page/Page';
import { CommentsCarousel } from '../../CommentsCarousel';
import classes from './CommentsBlock.module.scss';

interface CommentsBlockProps {
    className?: string;
}

export const CommentsBlock = memo((props: CommentsBlockProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const platform = useSelector(getPlatformData);
    const user = useSelector(getUserAuthData);

    const [newCommentText, setNewCommentText] = useState<string>('');

    const sendCommentHandler = useCallback(() => {
        dispatch(addCommentForPlatform({
            body: newCommentText,
            rate: 3,
            userId: user?._id,
            platformId: platform?._id,
        }));
    }, [dispatch, newCommentText, platform?._id, user]);

    if (!platform) {
        return (
            <h2>{t('Не удалось подгрузить комментарии')}</h2>
        );
    }

    return (
        <div className={classNames(classes.CommentsBlock, {}, [className])}>
            <CommentsCarousel platform={platform} />

            <VStack className={classes.addCommentForm} align="end" justify="end">
                <TextArea
                    placeholder={t('Ваш уникальный комментарий') as string}
                    value={newCommentText}
                    onChange={setNewCommentText}
                />
                <Button
                    style={{ borderRadius: 15 }}
                    disabled={!newCommentText}
                    onClick={sendCommentHandler}
                >
                    Отправить
                </Button>
            </VStack>
        </div>
    );
});
