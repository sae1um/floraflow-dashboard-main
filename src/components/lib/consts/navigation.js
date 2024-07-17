import {
	HiOutlineTemplate,
	HiOutlineHeart,
	HiOutlineLightningBolt,
	HiOutlineFire,
	HiOutlineLightBulb,
	HiOutlineAdjustments ,
	HiOutlineCog,
	HiOutlineDocumentText 
} from 'react-icons/hi'

export const SIDEBAR_DASHBOARD = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineTemplate />
	}
]

export const SIDEBAR_ANALYTICS_LINKS = [
	{
		key: 'health',
		label: 'Health Monitor',
		path: '/health',
		icon: <HiOutlineHeart />
	},{
		key: 'uptime',
		label: 'Uptime Monitor',
		path: '/uptime',
		icon: <HiOutlineLightningBolt />
	}
]
export const SIDEBAR_CONTROLS_LINKS = [
	{
		key: 'light',
		label: 'Light Controls',
		path: '/lightcontrols',
		icon: <HiOutlineLightBulb />
	},
	{
		key: 'temperature',
		label: 'Temperature Controls',
		path: '/temperatures',
		icon: <HiOutlineFire />
	},
	{
		key: 'sensor',
		label: 'Sensor Controls',
		path: '/sensorcontrol',
		icon: <HiOutlineAdjustments />
	}
]

export const SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineDocumentText />
	}
]
