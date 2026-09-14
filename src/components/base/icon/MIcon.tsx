import React from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomIcon } from './CustomIcon';
// import useTheme from '../../hooks/useTheme';

/**
 * @param {{name: string, IconComponent?: React.ReactNode, size?: number, color?: import('react-native').ColorValue, style?: import('react-native').TextStyle}} props
 */
const MIcon = (props) => {
    const { name, IconComponent, size, color, style } = props;
    // const { COLORS, FONT_SIZE, GUTTERS } = useTheme();
    const Component = IconComponent ?? CustomIcon;
    return (
        <Component
            {...props}
            name={name}
            style={[styles.default, style ?? {}]}
            size={size}
            color={color}
        />
    );
};

const styles = StyleSheet.create({
    default: {
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});

export default MIcon;
