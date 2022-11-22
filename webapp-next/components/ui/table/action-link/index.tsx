import { Link } from "@chakra-ui/react";

type Props = {
  params?: any[];
  action: ((...args: any[]) => void | Promise<any>) | undefined;
  children: React.ReactNode;
};

const ActionLink = (props: Props): JSX.Element => {
  const { children, params, action, ...rest } = props;
  return !!action ? (
    <Link
      {...rest}
      onClick={() => (params ? action(...params) : action())}
      cursor="pointer"
    >
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};

export default ActionLink;
