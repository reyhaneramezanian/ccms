import { useField } from 'formik';

export const InputShowOnValue = ({ name, children }: AppCommonChild & { name: string }) => {
    const [f] = useField(name);
    if (!f.value) {
        return null;
    }
    return <>{children}</>;
};

export const InputDisableOnValue = ({ Input, dependantName, ...props }) => {
    const [f] = useField(dependantName);
    return <Input {...props} disabled={f.value} />;
};
