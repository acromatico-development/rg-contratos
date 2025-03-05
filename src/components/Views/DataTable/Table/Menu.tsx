import Link from "next/link";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

import { IMenuItem } from "@interface";

interface TableMenuProps {
    menuItems: IMenuItem[];
    isOpen: boolean;
    onToggle: () => void;
    onItemClick: (menuItem: IMenuItem) => void;
}

export const TableMenu = ({ menuItems, isOpen, onToggle, onItemClick }: TableMenuProps) => {
    return (
        <div className="relative inline-block text-left">
            <div className="relative">
                <button
                    type="button"
                    className="flex items-center rounded-full p-2 hover:bg-gray-50"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle();
                    }}
                >
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </button>
                {isOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {menuItems.map((menuItem, menuIndex) => (
                                menuItem.type === 'link' && menuItem.href ? (
                                    <Link
                                        key={menuIndex}
                                        href={menuItem.href}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {menuItem.label}
                                    </Link>
                                ) : (
                                    <button
                                        key={menuIndex}
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onItemClick(menuItem);
                                        }}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {menuItem.label}
                                    </button>
                                )
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}; 