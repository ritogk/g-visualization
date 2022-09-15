/**
 * 端末
 */
enum Device {
  pc = 'pc',
  ios = 'ios',
  android = 'android',
}

/**
 * 言語
 */
enum Lang {
  ja = 'ja',
  en = 'en',
}

/**
 * 操作コード
 */
enum OperationCd {
  ENABLE_SENSOR = 1,
  CALIBRATION = 2,
  CALIBRATION_BEFORE_SETTING = 3,
  CALIBRATION_NEXT_1 = 4,
  CALIBRATION_NEXT_2 = 5,
  MAX_14_G = 6,
  MAX_10_G = 7,
  VOICE_OUTPUT_ON = 8,
  VOICE_OUTPUT_OFF = 9,
  GBOWL = 10,
  GINDICATOR = 11,
}

const circuit_max_g = 1.4
const touge_max_g = 1.0
export { Device, Lang, OperationCd, circuit_max_g, touge_max_g }
