import { NumberBadgeProps } from "./NumberBadge.types.ts";
import { NumberBadgeContainer } from "./NumberBadge.styled.ts";

const NumberBadge = ({ count }: NumberBadgeProps) => {
  return <NumberBadgeContainer>{count}</NumberBadgeContainer>;
};

export default NumberBadge;
