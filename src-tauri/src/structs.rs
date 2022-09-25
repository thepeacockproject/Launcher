use serde::{Deserialize, Serialize};

pub struct AppState {
    pub is_first_time: bool,
    pub config: AppConfig,
}

#[derive(Serialize, Deserialize)]
pub struct AppConfig {
    pub installed_versions: Vec<Version>,
}

#[derive(Deserialize)]
pub struct RemoteVersion {
    pub ident: String,
    pub is_latest: bool,
    pub url: String,
    pub node_version: String,
}

#[derive(Serialize, Deserialize)]
pub struct Version {
    pub ident: String,
    pub node_version: String,
}
