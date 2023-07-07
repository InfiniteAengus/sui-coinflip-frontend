export const mode = process.env.REACT_APP_MODE || '';

export const PACKAGE_ID = process.env.REACT_APP_PACKAGE_ID || '';
export const HOUSE_DATA_ID = process.env.REACT_APP_HOUSE_DATA_ID || '';

export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || '';
export const API_URL = process.env.REACT_APP_API_URL || '';

export const FULL_NODE = `https://api.shinami.com/node/v1/${
	process.env.REACT_APP_SHINAMI_KEY || ''
}`;

export const CAPY_NFT_TYPE = process.env.REACT_APP_CAPY_NFT || '';
export const BULLSHARK_NFT_TYPE = process.env.REACT_APP_BULLSHARK_NFT || '';
export const DLABS_NFT_TYPE = process.env.REACT_APP_DLABS_NFT || '';

export const KIOSK_TYPE = process.env.REACT_APP_KIOSK || '';
