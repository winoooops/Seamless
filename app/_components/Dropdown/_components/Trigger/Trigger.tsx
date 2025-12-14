import { ComponentProps, FC } from "react";
import Button from "../../../Button";
import { useDropdown } from "../../_context";

type Props = ComponentProps<typeof Button>;

const Trigger: FC<Props> = ({ children, ...other }) => {
   const { open, toggle, id } = useDropdown();

   return (
      <Button
         role="button"
         color="transparent"
         hasIcon
         onClick={toggle}
         aria-haspopup="listbox"
         aria-expanded={open}
         aria-controls={id}
         {...other}
      >
         {children}
      </Button>
   );
};

export default Trigger;
