import {
	HiOutlineTemplate,
	HiOutlineHeart,
	HiOutlineAdjustments,
	HiOutlineCog,
	HiOutlineDocumentText 
} from 'react-icons/hi'
import { TbFileExport, TbAlertHexagon } from "react-icons/tb";
import { MdOutlineEditNotifications } from "react-icons/md";
import { TbFileAlert } from "react-icons/tb";

export const NAVIGATION = [
	{
		segment: '',
		title: "Dashboard",
		icon: <HiOutlineTemplate />
	},
	{
		kind: 'divider',
	},
	{
		kind: 'header',
		title: 'ANALYTICS',
	},
	{
		segment: 'health', // url path
		title: "Health Monitor",
		path: "/healthmonitor",
		icon: <HiOutlineHeart />
	},
	{
		segment: 'event-log',
		title: "Event Log", 
		icon: <TbFileAlert />,
		children: [
			{
				segment: "export",
				title: "Export Data",
				icon: <TbFileExport />
			}
		]
	},
	{
		kind: 'divider',
	},
	{
		kind: 'header',
		title: 'CONTROLS',
	},
	{
		segment: 'alerts',
		title: "Alerts", 
		icon: <TbAlertHexagon />
	},
	{
		segment: 'notifications',
		title: "Notifications",
		icon: <MdOutlineEditNotifications  />
	},
	{
		segment: 'Preferences',
		title: "Garden Preferences", 
		icon: <HiOutlineAdjustments />
	}
]

export const SIDEBAR_BOTTOM_LINKS = [
	{
		segment: 'Settings',
		title: "Settings",
		icon: <HiOutlineCog />
	},
	{
		segment: 'Help & Support',
		title: "Help & Support",
		icon: <HiOutlineDocumentText />
	}
]
