export const columns = [
  {
    title: "Name",
    path: "name.common",
    shouldSort: true,
    shouldFilter: true,
  },
  {
    title: "Capital",
    path: "capital",
    shouldSort: true,
    shouldFilter: true,
  },
  {
    title: "Flag",
    path: "flags.svg",
    type: "img",
  },
];

export const filterableType = ["string", "number", "date"];
