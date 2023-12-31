import { AppLink } from 'shared/UI/AppLink/ui/AppLink';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { SidebarItemType } from '../../model/types/sidebar';
import classes from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed?: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            to={item?.path || ''}
            className={classNames(classes.item, { [classes.collapsed]: collapsed }, [])}
        >
            <item.Icon className={classes.icon} />
            <span className={classes.link}>
                {item?.text}
            </span>
        </AppLink>
    );
});
