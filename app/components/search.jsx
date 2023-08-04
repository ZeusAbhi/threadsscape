import React from "react";

const Search = ({ results }) => {
  return (
    <>
      {results.map((e) => {
        return (
          <>
            <a
              className="flex flex-col   gap-5 text-sm text-black hover:bg-slate-100 rounded-md "
              key={e.id} href={`/shop/${e.id}`}
            >
              <div className="my-3 flex items-center gap-3">
                <img src={e.thumbnail} className=" mx-2 h-14  w-14" alt="" />
                <h3>{e.title}</h3>
              </div>
            </a>
          </>
        );
      })}
    </>
  );
};

export default Search;
