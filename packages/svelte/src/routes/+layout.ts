type _LayoutData = {
	navigation: Array<{
		path: string;
		title: string;
	}>;
};

export const load = (): _LayoutData => {
	return {
		navigation: [
			{ path: '/', title: 'Hem' },
			{ path: '/sortiment', title: 'Sortiment' },
			{ path: '/kurser', title: 'Kurser' },
			{ path: '/bestallning', title: 'Beställning' },
			{ path: '/om', title: 'Om' },
			{ path: '/kontakt', title: 'Kontakt' }
		]
	};
};
