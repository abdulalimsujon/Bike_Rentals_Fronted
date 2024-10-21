import { TSidebarItem, TUserPath } from "../types";
import { NavLink } from "react-router-dom";

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: (
          <NavLink
            to={`/${role}/${item.path}`}
            className="text-blue-500 hover:text-blue-700" // Custom color classes
          >
            {item.name}
          </NavLink>
        ),
      });
    }

    if (item.children) {
      acc.push({
        key: item.name as string,
        // Parent label color
        label: (
          <span className="text-green-300 dark:text-gray-700">{item.name}</span>
        ),
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink
                  to={`/${role}/${child.path}`}
                  className="text-green-300 hover:text-green-700" // Custom color classes
                >
                  {child.name}
                </NavLink>
              ),
            };
          }
        }),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
