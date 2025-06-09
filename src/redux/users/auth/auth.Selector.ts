import type { RootState } from "../../../app/store";



export const selectTokenValue = (state: RootState) => state.auth.token;
