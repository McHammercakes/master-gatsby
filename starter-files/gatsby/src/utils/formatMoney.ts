const formatter = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

export default function formatMoney(cents: number) {
	return formatter.format(cents / 100);
}
