import { useField } from "formik";
import { BSLabel } from "../input/styled";
import { BSToggleButton } from "./styled";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  children?: React.ReactNode;
  WrapperComponent?: AppStyledComponent<any>;
}

export const MToggleButton = ({
  label,
  children,
  WrapperComponent = BSToggleButton,
  ...props
}: Props) => {
  return (
    <WrapperComponent checked={props.value}>
      {label && <BSLabel span>{label}</BSLabel>}
      {children && children}
      <input
        checked={Boolean(props.value)}
        onChange={() => {}}
        {...props}
        id={props.id || "switch"}
        type="checkbox"
      />
      <label htmlFor={props.id || "switch"}></label>
    </WrapperComponent>
  );
};

export const MToggleButtonFormik = ({
  label,
  children,
  WrapperComponent = BSToggleButton,
  ...props
}: Props & { name: string }) => {
  const [field] = useField(props.name);
  return <MToggleButton {...props} {...field} />;
};
