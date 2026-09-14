export const capitalizeFirstString = (input) => {
    if (input) {
        return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase() 
    } else {
        return null;
    }
};
