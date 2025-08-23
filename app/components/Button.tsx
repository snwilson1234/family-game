import { useRouter } from "next/navigation";
import { Button } from "primereact/button";

export interface PButtonProps {
  label: string;
  isLink?: boolean;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const PButton = ({
  label,
  isLink = false,
  href = "",
  disabled = false,
  onClick,
}: PButtonProps) => {
  const router = useRouter();

  if (isLink) {
    return (
      <Button
        disabled={disabled}
        className="font-bold"
        label={label}
        onClick={() => {
          if (onClick) onClick();
          if (href) router.push(href);
        }}
      />
    );
  }

  return (
    <Button
      disabled={disabled}
      className="font-bold"
      label={label}
      onClick={onClick}
    />
  );
};

export default PButton;
