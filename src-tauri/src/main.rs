#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;
mod file_utils;
mod http_utils;
mod structs;

use crate::commands::{download_version, is_first_time, launch_test, unzip_test};
use crate::file_utils::ensure_directory_structure;
use crate::structs::AppState;
use tauri::Manager;

#[tokio::main]
async fn main() {
    // get the config, and if it's the first time, create the directory structure
    let config = file_utils::load_config().expect("Failed to load config");
    ensure_directory_structure();

    tauri::Builder::default()
        .manage(AppState {
            is_first_time: config.1,
            config: config.0,
        })
        .setup(|app| {
            app.listen_global("event-name", |event| {
                println!("got event-name with payload {:?}", event.payload());
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            is_first_time,
            download_version,
            unzip_test,
            launch_test,
        ])
        .run(tauri::generate_context!())
        .expect("Error while running Peacock Launcher");
}
