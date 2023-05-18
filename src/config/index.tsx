export const mode = "dev";
// devnet
const DEV_PACKAGE_ID = "0x966036476538776644d6ed815e6adc140226bd4e161ef1f267e7663c2e1239b9";
const DEV_HOUSE_DATA_ID = "0x5b74621fde91da9d2e8a887943fd11912eafbcd9f91adc1df57abf81174bbf69";

// // mainnet
const PRODUCT_PACKAGE_ID = "0xdc16f545b224e66f12f2ac52688a8927209bf9640234abf91d47fd8ef8ff3ded";
const PRODUCT_HOUSE_DATA_ID = "0x72eaacc50b0158254bf44c38dac9200ab51de43eeed42a8fae2b3d65a2ac9fa3";

export const PACKAGE_ID = mode == "dev" ? DEV_PACKAGE_ID : PRODUCT_PACKAGE_ID;
export const HOUSE_DATA_ID = mode == "dev" ? DEV_HOUSE_DATA_ID : PRODUCT_HOUSE_DATA_ID;

// 0xdc16f545b224e66f12f2ac52688a8927209bf9640234abf91d47fd8ef8ff3ded
// 0x72eaacc50b0158254bf44c38dac9200ab51de43eeed42a8fae2b3d65a2ac9fa3