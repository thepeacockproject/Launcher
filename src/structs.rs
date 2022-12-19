use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct AppState {
    pub is_first_time: bool,
    pub config: AppConfig,
}

#[derive(Serialize, Deserialize)]
pub struct AppConfig {
    pub active_version: String,
}

#[derive(Deserialize)]
pub struct RemoteVersion {
    pub ident: String,
    pub is_latest: bool,
    pub url: String,
}
