import AsyncSelect from "react-select/async";
import { debounce } from "../../utils/utils";

const AsyncMultiSelect = ({
  loadOptions,
  onChange,
  value,
  placeholder = "Select...",
  isClearable = true,
  delayTime = 1000,
  ...rest
}) => {
  const debouncedLoadOptions = debounce((inputValue, callback) => {
    loadOptions(inputValue).then(callback);
  }, delayTime);

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      loadOptions={debouncedLoadOptions}
      onChange={onChange}
      value={value}
      isClearable={isClearable}
      placeholder={placeholder}
      defaultOptions // Optional: show some default options
      {...rest}
    />
  );
};

export default AsyncMultiSelect;
