export type MenuItemType = 'link' | 'action';

export interface IMenuItem {
    type: MenuItemType;
    label: string;
    action?: () => void;
    href?: string;
}