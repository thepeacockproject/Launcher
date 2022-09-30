use crate::file_utils::{get_data_dir, unzip_to_directory};
use crate::http_utils::download_file;
use crate::AppState;
use reqwest::Client;
use tauri::async_runtime::block_on;
use tauri::State;
use tokio::task;

#[tauri::command]
pub fn download_version(version: &str) {
    println!("Downloading version {}", version);

    let client = Client::new();
    let task = download_file(&client, "https://google.com", "test.txt");

    block_on(task).expect("Failed to download file!");
}

#[tauri::command]
pub fn is_first_time(state: State<AppState>) -> bool {
    state.is_first_time
}

#[tauri::command]
pub fn unzip_test() {
    let data_dir = get_data_dir().expect("Failed to get data dir");

    let zip_path = data_dir.0.join("Peacock.zip");

    task::spawn(async move {
        unzip_to_directory(&zip_path, &data_dir.0);
    });
}
