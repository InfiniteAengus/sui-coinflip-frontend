export const mode = process.env.NEXT_PUBLIC_MODE;
// devnet
const DEV_PACKAGE_ID = process.env.NEXT_PUBLIC_DEV_PACKAGE_ID;
const DEV_HOUSE_DATA_ID = process.env.NEXT_PUBLIC_DEV_HOUSE_DATA_ID;

// // mainnet
const PRODUCT_PACKAGE_ID = process.env.NEXT_PUBLIC_PRODUCT_PACKAGE_ID;
const PRODUCT_HOUSE_DATA_ID = process.env.NEXT_PUBLIC_PRODUCT_HOUSE_DATA_ID;

export const PACKAGE_ID = mode == 'dev' ? DEV_PACKAGE_ID : PRODUCT_PACKAGE_ID;
export const HOUSE_DATA_ID = mode == 'dev' ? DEV_HOUSE_DATA_ID : PRODUCT_HOUSE_DATA_ID;

// 0xdc16f545b224e66f12f2ac52688a8927209bf9640234abf91d47fd8ef8ff3ded
// 0x72eaacc50b0158254bf44c38dac9200ab51de43eeed42a8fae2b3d65a2ac9fa3
