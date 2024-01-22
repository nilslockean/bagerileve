// export enum MenuArea {
// 	Main = 'main-navigation',
// 	Footer = 'footer-navigation',
// 	Colophon = 'colophon-navigation'
// }

export type SiteConfig = {
	siteTitle: string;
	navigation: Array<{
		path: string;
		title: string;
		header: boolean;
		footer: boolean;
	}>;
};

const config: SiteConfig = {
	siteTitle: 'Bageri Leve',
	navigation: [
		{ path: '/sortiment', title: 'Sortiment', header: true, footer: false },
		{ path: '/kurser', title: 'Kurser', header: true, footer: false },
		{ path: '/bestallning', title: 'Beställning', header: true, footer: false },
		{ path: '/om', title: 'Om', header: true, footer: false },
		{ path: '/kontakt', title: 'Kontakt', header: true, footer: false },
		{ path: '/integritetspolicy', title: 'Integritetspolicy', header: false, footer: true },
		{ path: '/bokningsvillkor', title: 'Bokningsvillkor', header: false, footer: true }
	]
} as const;

export default config;
