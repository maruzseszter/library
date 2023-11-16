import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { BiBookAdd } from "react-icons/bi";
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const links = [
    {
        text: 'Könyv Felvétele'.replace('Felvétele', 'felvétele'),
        path: '.',
        icon: <BiBookAdd />
    },
    {
        text: 'all books',
        path: 'all-books',
        icon: <MdQueryStats />
    },
    {
        text: 'készletjelentés',
        path: 'stats',
        icon: <IoBarChartSharp />
    },
    {
        text: 'profile',
        path: 'profile',
        icon: <ImProfile />
    },
    {
        text: 'admin',
        path: 'admin',
        icon: <MdAdminPanelSettings />
    },
];

export default links;