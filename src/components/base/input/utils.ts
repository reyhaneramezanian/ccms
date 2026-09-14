export function memoCompareChanges(prev, next) {
    return (
        prev.name === next.name &&
        prev.value === next.value &&
        prev.type === next.type &&
        next?.meta?.touched === prev?.meta?.touched &&
        next?.meta?.error === prev?.meta?.error &&
        prev?.type === next?.type
    );
}
