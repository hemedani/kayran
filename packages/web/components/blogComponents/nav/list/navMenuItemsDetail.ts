// menu items have an rectangle aside
// id is used to manage active tab

export interface INavMenuItemsDetail {
  id: number;
  title: string;
  link?: string;
  isMenu?: boolean;
}
export const navMenuItemsDetail: INavMenuItemsDetail[] = [
  {
    id: 0,
    title: "بلاگ",
    isMenu: true,
  },
  {
    id: 1,
    title: "ثبت نام فروشندگان",
  },
  { id: 2, title: "درخواست همکاری", link: "/" },
  { id: 3, title: "سوالات متداول", link: "/" },
  { id: 5, title: "درباره ما", link: "/" },
  { id: 6, title: "ارتباط با ما", link: "/" },
];

export const subMenuList = [
  { id: 0, title: "فناوری", link: "/" },
  { id: 1, title: "سلامت", link: "/" },
  { id: 2, title: "بهداشت عمومی", link: "/" },
];
