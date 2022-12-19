use crate::file_utils::{get_data_dir, unzip_to_directory};
use crate::http_utils::download_file;
use crate::AppState;
use reqwest::Client;
use std::collections::HashMap;
use task::spawn;
use tokio::process::Command;
use tokio::task;
use tokio::task::block_in_place;

pub fn download_version(version: &str) {
    // TODO: Unfinished implementation
    println!("Downloading version {}", version);

    let client = Client::new();
    let task = download_file(&client, "https://google.com", "test.txt");
    // block this thread until task is complete
    let _ = block_in_place(|| task);
}

pub fn unzip_test() {
    let data_dir = get_data_dir(false).expect("Failed to get data dir");

    let zip_path = data_dir.0.join("Peacock.zip");

    spawn(async move {
        unzip_to_directory(&zip_path, &data_dir.0);
    });
}

pub async fn launch_version(state: AppState) {
    // TODO: Unfinished implementation

    let (data_dir, _) = get_data_dir(false).expect("Failed to get data dir");
    let chunk0_path = data_dir.join(format!(
        "Peacock-{0}/chunk0.js",
        state.config.active_version
    ));

    let mut environment = HashMap::new();

    environment.insert("NODE_ENV".to_string(), "production".to_string());
    environment.insert("FORCE_COLOR".to_string(), "true".to_string());
    environment.insert("IS_PEACOCK_LAUNCHER".to_string(), "true".to_string());
    environment.insert("SUPPORTS_COLOR".to_string(), "true".to_string());

    let _ = Command::new(String::from("node"))
        .envs(environment)
        .current_dir(data_dir.join("workspace"))
        .args([chunk0_path
            .to_str()
            .expect("chunk0 path should be valid str.")])
        .spawn()
        .expect("Failed to execute command");

    spawn(async move {});
}
