import { useEffect, useState } from 'react';
import { subscribe, reservationNotificationAdded } from './subscription';
class NotificationObserver {
    #listeners = new Set();
    #unsubscribe;
    messages = [];
    register(listener) {
        this.#listeners.add(listener);
    }
    unregister(listener) {
        this.#listeners.delete(listener);
    }
    observe() {
        this.#unsubscribe = subscribe(reservationNotificationAdded.query, undefined, this.#notify);
    }
    #notify = (message) => {
        const data = JSON.parse(message?.data || '{}');
        if (data?.type === 'ka') return;
        if (data?.type === 'connection_ack') return;
        this.messages.push(message);
        this.#listeners.forEach((listener: (x: string) => void) => listener(message));
    };
    disconnect() {
        if (typeof this.#unsubscribe !== 'function') return;
        this.#unsubscribe();
    }
    clear(){
        this.messages.length = 0;
    }
}
const observer = new NotificationObserver();

export default observer;

export function useGetObservedNotifications() {
    const [messages, setMessages] = useState(observer.messages);
    const clearMessages = () => {
        setMessages([]);
        observer.clear();
    }
    useEffect(() => {
        function listener(message) {
            setMessages((messages) => [...messages, message]);
        }
        observer.register(listener);
        return () => observer.unregister(listener);
    }, []);
    return { messages, clearMessages };
}
