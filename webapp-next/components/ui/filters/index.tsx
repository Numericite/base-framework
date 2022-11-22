import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Text,
  MenuList,
  MenuItem,
  MenuGroup,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { TableFilter } from "../table/interfaces";
import { Filter, FilterProps } from "./interface";
import { useState, useEffect } from "react";

const UIFilter = (props: FilterProps) => {
  const { filters, hasApply, setSelectedFilters } = props;
  const [currentSelectedFilter, setCurrentSelectedFilter] = useState<Filter[]>(
    []
  );

  const handleFilterChange = (filter: Filter) => {
    if (currentSelectedFilter.map((_) => _.value).includes(filter.value)) {
      setCurrentSelectedFilter(
        currentSelectedFilter.filter((f) => f.value !== filter.value)
      );
    } else {
      setCurrentSelectedFilter([...currentSelectedFilter, filter]);
    }
  };

  const filterValidation = () => {
    setSelectedFilters(currentSelectedFilter);
  };

  useEffect(() => {
    if (!hasApply) setSelectedFilters(currentSelectedFilter);
  }, [currentSelectedFilter]);

  return (
    <Menu>
      <MenuButton px={4} bgColor="primary" borderRadius={"2xl"} color="white">
        <Text
          display="flex"
          alignItems={"center"}
          fontSize="sm"
          fontWeight={"bold"}
        >
          <ChevronDownIcon mr={2} />
          Filtres
        </Text>
      </MenuButton>
      <MenuList w="full">
        {filters.map((filter: TableFilter) => (
          <MenuGroup key={filter.slug}>
            <Text pl={3} fontSize="sm" fontWeight={"bold"}>
              {filter.title}
            </Text>
            <MenuGroup>
              {filter.items.map((item: Filter) => (
                <MenuItem key={item.value} closeOnSelect={false}>
                  <Checkbox
                    key={item.value}
                    onChange={() => {
                      handleFilterChange({
                        label: filter.slug,
                        value: item.value,
                      });
                    }}
                  >
                    {item.label}
                  </Checkbox>
                </MenuItem>
              ))}
            </MenuGroup>
          </MenuGroup>
        ))}
        {hasApply && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            bgColor="primary"
            color={"white"}
            my={3}
            ml={3}
            _hover={{ color: "primary", bgColor: "white" }}
            onClick={filterValidation}
          >
            <Text>Appliquer</Text>
          </Button>
        )}
      </MenuList>
    </Menu>
  );
};

export default UIFilter;
