import {CO_QUOC_GIA, STATIC_IMAGE} from '../helpers/ApiConstants'

const getCoIcon = (
    code = 'VN',
    style = CO_QUOC_GIA.STYLE.FLAT,
    size = CO_QUOC_GIA.SIZE[64],
  ) => `${CO_QUOC_GIA.BASE_URL}/${code}/${style}/${size}.png`;

const getLogo = (ImageId: any) => {
  return `${STATIC_IMAGE.BASE_URL}/logo/${ImageId}.png`
}

const getPoster = (ImageId: any) => {
  const posterUri = `${STATIC_IMAGE.BASE_URL}/${STATIC_IMAGE.TYPE.POSTER}/${ImageId}.png`
  return posterUri;
}

const getGallery = (ImageId: any, size = STATIC_IMAGE.SIZE.SQUARE) => {
  return `${STATIC_IMAGE.BASE_URL}/${STATIC_IMAGE.TYPE.GALLERY}/${size}/${ImageId}.png`
}

export { getCoIcon, getLogo, getPoster, getGallery };