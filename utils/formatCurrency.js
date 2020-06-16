import 'intl';
import 'intl/locale-data/jsonp/en';

export default function format(amount, currency) {
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency,
  });

  return formatter.format(amount);
}
