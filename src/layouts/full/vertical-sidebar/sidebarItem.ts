import {
    MenuIcon,
    CircleIcon,
    CircleOffIcon,
    BrandChromeIcon,
    MoodSmileIcon,
    StarIcon,
    AwardIcon,
    NewsIcon,
    SettingsIcon,
    LockIcon,
    LayoutIcon,
    FileExportIcon,
    FileDescriptionIcon,
    ToolsOffIcon,
    HomeIcon,
    UsersIcon,
    EditCircleIcon,
    Receipt2Icon, FileInvoiceIcon, InfoSquareIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    description?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    {header: 'dashboard'},
    // {
    //     title: 'dashboard',
    //     icon: LayoutIcon,
    //     to: '/'
    // },

    // {
    //     title: 'models',
    //     icon: NewsIcon,
    //     to: '#',
    //     children: [
    //         {
    //             title: 'creation',
    //             icon: FileExportIcon,
    //             to: '/models-creation'
    //         }, {
    //             title: 'consultation',
    //             icon: FileDescriptionIcon,
    //             to: '/models-consultation'
    //         },

    //     ]
    // },
    {
        title: 'Home',
        icon: HomeIcon,
        to: '/base-cv',

    },
    {
        title: 'Jobs',
        icon: StarIcon,
        to: '/jobs',

    },
    // {
    //     title: 'personalization',
    //     icon: ToolsOffIcon,
    //     to: '#',
    //     children: [
    //         {
    //             title: 'candidates',
    //             icon: UsersIcon,
    //             to: '/candidates'
    //         }, {
    //             title: 'editor',
    //             icon: EditCircleIcon,
    //             to: '/personalisation-editeur'
    //         },

    //     ]
    // },

    {header: 'billing'},
    {
        title: 'billing',
        icon: Receipt2Icon,
        to: '#',
        children: [
            // {
            //     title: 'pricing',
            //     icon: CircleIcon,
            //     to: '/facturation-upgrade-plan'
            // },
            // {
            //     title: 'invoice',
            //     icon: FileInvoiceIcon,
            //     to: '/facturation-invoice'
            // },
            {
                title: 'buyCredits',
                icon: CircleIcon,
                to: '/buy-credits'
            },

        ]
    },
    // {header: 'settings'},
    // {
    //     title: 'settings',
    //     icon: SettingsIcon,
    //     to: '/user-settings'
    // },
    {
        title: 'support',
        icon: InfoSquareIcon,
        to: '/support'
    },
    // {
    //     title: 'testing',
    //     icon: LockIcon,
    //     to: '/testing'
    // },
    // {
    //     title: 'Sub Caption',
    //     icon: StarIcon,
    //     subCaption: 'This is the subtitle',
    //     to: '/flexy'
    // },
    // {
    //     title: 'Chip',
    //     icon: AwardIcon,
    //     chip: '9',
    //     chipColor: 'surface',
    //     chipBgColor: 'secondary',
    //     to: '/flexy'
    // },
    // {
    //     title: 'Outlined',
    //     icon: MoodSmileIcon,
    //     chip: 'outline',
    //     chipColor: 'secondary',
    //     chipVariant: 'outlined',
    //     to: '/flexy'
    // },
    // {
    //     title: 'External Link',
    //     icon: StarIcon,
    //     to: '/flexy',
    //     type: 'external'
    // }
];

export default sidebarItem;

// {
//     title: 'Menu Level',
//     icon: MenuIcon,
//     to: '#',
//     children: [
//         {
//             title: 'Level 1',
//             icon: CircleIcon,
//             to: '/level1'
//         },
//         {
//             title: 'Level 1',
//             icon: CircleIcon,
//             to: '/2level',
//             children: [
//                 {
//                     title: 'Level 2',
//                     icon: CircleIcon,
//                     to: '/barry'
//                 },
//                 {
//                     title: 'Level 2',
//                     icon: CircleIcon,
//                     to: '/2.2level',
//                     children: [
//                         {
//                             title: 'Level 3',
//                             icon: CircleIcon,
//                             to: '/barry'
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// },