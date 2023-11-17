import {CO_QUOC_GIA} from '../helpers/ApiConstants'

const getCoIcon = (
    code = 'VN',
    style = CO_QUOC_GIA.STYLE.FLAT,
    size = CO_QUOC_GIA.SIZE[64],
  ) => `${CO_QUOC_GIA.BASE_URL}/${code}/${style}/${size}.png`;

export { getCoIcon };