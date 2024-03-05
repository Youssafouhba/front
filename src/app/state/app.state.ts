import {AuthState} from "../userEnvironment/state/auth.reducers";
import {AdminState} from "../adminEnvironment/state/admin.reducers";
export interface AppState {
    antiHeroState: AdminState,
    authState: AuthState,
}
