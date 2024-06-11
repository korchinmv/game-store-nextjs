import { sortByButton } from "@/types/SortBy";
import { Response } from "@/types/Response";
import { Dispatch, SetStateAction } from "react";
import FilterButton from "./FilterButton";
import Button from "./Button";

interface FilterProps {
  queryString: Object;
  handleClickResetFilter: () => void;
  sortByButton: sortByButton[];
  dataPlatforms: Response[];
}

const Filter = ({
  queryString,
  handleClickResetFilter,
  sortByButton,
  dataPlatforms,
}: FilterProps) => {
  return (
    <div className='menu-block mb-[30px] flex self-start gap-[15px]'>
      <FilterButton name='Sort by' data={sortByButton} label='Sort games' />

      {dataPlatforms && (
        <FilterButton
          name='Platforms'
          data={dataPlatforms}
          label='Choose platform'
        />
      )}

      {Object.keys(queryString).length > 0 ? (
        <Button
          text={"Reset"}
          label={"Reset filter"}
          handleClick={handleClickResetFilter}
        />
      ) : null}
    </div>
  );
};

export default Filter;
