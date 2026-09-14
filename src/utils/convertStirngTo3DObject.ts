class Convert {
    static convertStringToObject = (
        str: string,
        value: any,
        pattern: string = '.'
    ): Object | undefined => {
        const customValue = str.split(pattern);

        const replacedPattern = '$VALUE$';
        const handleReplaced = (data, result) => {
            return data.replace(replacedPattern, `{ "${result}": ${replacedPattern} }`);
        };

        let currentField = `{ "${customValue[0]}": ${replacedPattern} }`;

        customValue.forEach((value, index) => {
            if (index === 0) return;

            currentField = handleReplaced(currentField, value);
        });

        return JSON.parse(currentField.replace(replacedPattern, `${JSON.stringify(value)}`));
    };
    static convertStringToObjectOrderBy = (
        str: string,
        value: string,
        pattern: string = '.'
    ): Object | undefined => {
        const customValue = str?.split(pattern);
        if (customValue != undefined) {
            const replacedPattern = '$VALUE$';
            const handleReplaced = (data, result) => {
                return data.replace(replacedPattern, `{ "${result}": ${replacedPattern} }`);
            };

            let currentField = `{ "${customValue[0]}": ${replacedPattern} }`;

            customValue.forEach((value, index) => {
                if (index === 0) return;

                currentField = handleReplaced(currentField, value);
            });

            return JSON.parse(currentField.replace(replacedPattern, `${JSON.stringify(value)}`));
        }
    };
}
export default Convert;
