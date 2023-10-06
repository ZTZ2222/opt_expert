import clsx from "clsx";

const getVariant = (variant?: VariantType) => {
  switch (variant) {
    case "primary":
      return "bg-gradient-to-r from-bgButton1 to-bgButton2 text-center text-white transition-all";
    case "danger":
      return "bg-red-500 hover:bg-red-700 text-white  shadow shadow-red-600/25 hover:shadow-red-600/75";
    case "success":
      return "bg-green-500 hover:bg-green-700 text-white shadow shadow-green-600/25 hover:shadow-green-600/75 ";
    case "warning":
      return "bg-amber-500 hover:bg-amber-700 text-white shadow shadow-yellow-600/25 hover:shadow-yellow-600/75 ";
    case "cart":
      return "bg-white border border-gray-400 hover:text-white hover:bg-bgButton1";

    default:
      return "rounded-[30px] bg-gradient-to-r from-bgButton1 to-bgButton2 text-center text-white";
  }
};

type VariantType = "primary" | "danger" | "success" | "warning" | "cart";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  variant?: VariantType;
  square?: boolean;
  paddingLess?: boolean;
}
export const Button = ({
  className,
  children,
  variant,
  square,
  paddingLess,
  type = "button",
  ...props
}: IButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      className={clsx(
        `${getVariant(variant)} transition duration-300 ${
          !paddingLess && "px-4 py-2"
        } ${square ? "rounded-sm" : "rounded-[30px]"}  active:scale-95`,
        className,
      )}
    >
      {children}
    </button>
  );
};
