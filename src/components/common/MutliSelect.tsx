const MutliSelect = ({  onChange, defaultValue, categories }: any) => {
  return (
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block  
  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 w-80"
      // className="focus:ring-gray-300 focus:border-slate-400 block w-full outline-0 border rounded-sm  focus:outline-none"
      multiple
      //   defaultValue={field.value}
      // defaultValue={["66046324744fde43603e1d15"]}
      // size={
      //   categories?.length && categories.length > 5
      //     ? 5
      //     : categories?.length && categories.length < 5
      //     ? categories.length
      //     : 1
      // }
      defaultValue={defaultValue}
      onChange={(e) => {
        const selectedOptions = Array.from(
          e.target.selectedOptions,
          (option) => option.value
        );
        onChange(selectedOptions);
        // field.onChange(selectedOptions);
        // console.log(selectedOptions);
      }}
    >
      {/* {categories?.length
        ? categories.map((cat) => (
            <option
              value={cat._id}
              key={cat._id}
              className="p-1 "
            >
              {cat.name}
            </option>
          ))
        : null} */}
      {
        // [
        //   {
        //     _id: "66046324744fde43603e1d15",
        //     name: "shrubs",
        //   },
        //   {
        //     _id: "6604636c744fde43603e1d18",
        //     name: "medicinal",
        //   },
        //   {
        //     _id: "66057359437b5bf65ac55af8",
        //     name: "recreaintional",
        //   },
        // ]
        categories.map((cat) => (
          <option value={cat._id} key={cat._id} className="p-1 ">
            {cat.name}
          </option>
        ))
      }
    </select>
  );
};

export default MutliSelect;
