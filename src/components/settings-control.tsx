// @ts-nocheck
import { useEditor, useNode } from "@craftjs/core";
import { Component, ReactNode, useEffect, useState } from "react";
import Select, { MultiValue, components, createFilter } from "react-select";

interface Option {
  label: string;
  value: string;
}

// import { Option } from "react-tailwindcss-select/dist/components/type";
import { FixedSizeList as List } from "react-window";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { suggestions } from "@/lib/tw-classes";

const selectOptions = suggestions.map((value) => ({ label: value, value }));

export const SettingsControl = () => {
  const { query, actions } = useEditor();
  const {
    id,
    nodeProps,
    parent,
    deletable,
    actions: { setProp },
  } = useNode((node) => ({
    nodeProps: node.data.props,
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
  }));

  if (!nodeProps) return null;

  const {
    className: classNames = "",
    children: text,
    ...otherProps
  } = nodeProps as any;

  const tailwindcssArr = classNames
    ? classNames.split(" ").filter(Boolean)
    : [];

  const initialOptions = tailwindcssArr.map((value) => ({
    label: value,
    value,
  }));

  useEffect(() => {
    const tailwindcssArr = classNames
      ? classNames.split(" ").filter(Boolean)
      : [];

    const newOptions = tailwindcssArr.map((value) => ({
      label: value,
      value,
    }));

    setValue(newOptions);
  }, [classNames]);

  const [value, setValue] = useState<MultiValue<Option>>(initialOptions);

  const height = 35;

  interface MenuListProps {
    options: any[];
    children: any[];
    maxHeight: number;
    getValue: () => any[];
  }

  class MenuList extends Component<MenuListProps> {
    render() {
      const { options, children, maxHeight, getValue } = this.props;
      const [value] = getValue();
      const initialOffset = options.indexOf(value) * height;

      return (
        <List
          width={"100%"} // Replace with the desired width value
          height={maxHeight}
          itemCount={children.length}
          itemSize={height}
          initialScrollOffset={initialOffset}
        >
          {({ index, style }) => <div style={style}>{children[index]}</div>}
        </List>
      );
    }
  }

  const CustomOption = ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    innerProps: any;
  }) => {
    // Remove the niceties for mouseover and mousemove to optimize for large lists
    // eslint-disable-next-line no-unused-vars
    const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    const newProps = { ...props, innerProps: rest };
    return (
      <components.Option {...newProps}>
        <div className="text-xs">{children}</div>
      </components.Option>
    );
  };

  const [newPropKey, setNewPropKey] = useState("");
  const [newPropValue, setNewPropValue] = useState("");

  return (
    <div className="p-16">
      {deletable ? (
        <Button
          variant={"destructive"}
          className="cursor-pointer mb-16 w-full"
          onClick={(event) => {
            event.stopPropagation();
            actions.delete(id);
            actions.selectNode(parent);
          }}
        >
          <Trash2 className="mr-8 h-16 w-16" />
          Delete
        </Button>
      ) : null}
      {typeof text === "string" ? (
        <Input
          type="text"
          value={text}
          className="mb-16"
          onChange={(e) =>
            setProp(
              (props: { children: ReactNode }) =>
                (props.children = e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
            )
          }
        />
      ) : null}
      <Select
        options={selectOptions}
        isSearchable
        isClearable={false}
        components={{ MenuList, Option: CustomOption }}
        isMulti
        placeholder={"Add new class"}
        value={value}
        filterOption={createFilter({ ignoreAccents: false })}
        onChange={(option) => {
          if (option && Array.isArray(option)) {
            const classNames = option.map((item) => item.value).join(" ");
            setProp((props: { className: string }) => {
              console.log("Setting props ", props.className);
              props.className = classNames;
            });
          }

          if (!option) {
            setProp((props: { className: string }) => (props.className = ""));
          }

          setValue(option);
        }}
      />
      {Object.entries(otherProps).map(([key, val]) => {
        console.log("key, val", key, val);
        if (typeof val === "boolean") {
          return (
            <div key={key} className="mb-16 flex items-center space-x-8">
              <span className="text-sm w-1/3">{key}</span>
              <input
                type="checkbox"
                checked={val}
                onChange={(e) =>
                  setProp((props: any) => {
                    props[key] = e.target.checked;
                  })
                }
              />
            </div>
          );
        }
        return (
          <div key={key} className="mb-16 flex items-center space-x-8">
            <span className="text-sm w-1/3">{key}</span>
            <Input
              value={String(val)}
              onChange={(e) =>
                setProp((props: any) => {
                  const original = val;
                  let newVal: any = e.target.value;
                  if (typeof original === "number") {
                    newVal = Number(newVal);
                  }
                  props[key] = newVal;
                })
              }
            />
          </div>
        );
      })}

      <div className="mb-16 flex items-center space-x-8">
        <Input
          placeholder="Prop name"
          value={newPropKey}
          onChange={(e) => setNewPropKey(e.target.value)}
        />
        <Input
          placeholder="Value"
          value={newPropValue}
          onChange={(e) => setNewPropValue(e.target.value)}
        />
        <Button
          onClick={() => {
            if (!newPropKey) return;
            setProp((props: any) => {
              (props as any)[newPropKey] = newPropValue;
            });
            setNewPropKey("");
            setNewPropValue("");
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};
