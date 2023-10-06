import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

interface MenuItem {
  label: string;
  link: string;
}

interface Props {
  menuList: MenuItem[];
}

const ListViewNavigations = ({ menuList }: Props) => {
  const { push } = useRouter();
  return menuList.map((item) => (
    <ListItem key={item.link} onClick={() => push(`/admin/${item.link}`)}>
      <ListItemPrefix>
        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
      </ListItemPrefix>
      {item.label}
    </ListItem>
  ));
};

export default ListViewNavigations;
