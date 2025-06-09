import React from "react";

import {
  NavigationMenuLink,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
} from "./ui/vertical-navigation-menu";
import { useEditor } from "@craftjs/core";
import { Components } from "./node/components-map";
import { cn } from "@/lib/utils";

export interface SideMenuProps {
  componentsMap: Components[];
}

export const SideMenu = ({ componentsMap }: SideMenuProps) => {
  const { connectors } = useEditor();

  return (
    <NavigationMenu
      orientation="vertical"
      className="justify-start items-start border-r"
    >
      <NavigationMenuList className="flex-col w-144">
        {componentsMap.map((menuItem, index) => (
          <NavigationMenuItem key={index} className="p-8">
            <NavigationMenuTrigger className="flex justify-between w-full">
              {menuItem.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-full h-full">
              <ul className="w-full overflow-y-scroll h-full">
                {menuItem.items.map((component, index) => (
                  <ListItem
                    key={index}
                    ref={(ref) => {
                      if (ref) {
                        connectors.create(ref, component.node);
                      }
                    }}
                  >
                    {component.demo ? component.demo : component.name}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <NavigationMenuViewport className="w-[300px] left-1 border-r shadow-none" />
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, children, ...props }, ref) => {
  return (
    <li className="w-full p-8">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block w-full select-none space-y-4 rounded-md p-8 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground border-1 border-dashed border-gray-300",
            className
          )}
          {...props}
        >
          <div className="text-sm w-full font-medium leading-none">
            {children}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
