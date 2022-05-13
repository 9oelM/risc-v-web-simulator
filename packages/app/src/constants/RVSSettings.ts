export interface RVSSettings {
  is_debug_on: 0 | 1
  is_data_fwd_on: 0 | 1
  is_br_pred_on: 0 | 1
}

export const defaultRVSSettings: RVSSettings = {
  is_debug_on: 1,
  is_data_fwd_on: 0,
  is_br_pred_on: 0,
}
