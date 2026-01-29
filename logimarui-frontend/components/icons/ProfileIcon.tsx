import Svg, { Circle, Path } from 'react-native-svg';

type Props = {
  color: string;
  size?: number;
};

export function ProfileIcon({ color, size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth={2} />
      <Path
        d="M4 21C4 16.58 7.58 13 12 13C16.42 13 20 16.58 20 21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
