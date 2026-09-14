import React from 'react';
import { useGetMaybeUser } from 'src/auth/UserProvider';
import observer from './notification_observer';

export const SubscriptionComponent = () => {
    const user = useGetMaybeUser();
    React.useEffect(() => {
        if(typeof user === 'object') observer.observe();
        return () => observer.disconnect();
    }, [user]);

    return null;
};
