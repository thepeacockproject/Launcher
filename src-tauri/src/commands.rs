use crate::file_utils::{get_data_dir, unzip_to_directory};
use crate::http_utils::download_file;
use crate::AppState;
use reqwest::Client;
use std::collections::HashMap;
use task::spawn;
use tauri::api::process::{Command, CommandEvent};
use tauri::async_runtime::block_on;
use tauri::{State, Window, Wry};
use tokio::task;

#[tauri::command]
pub fn download_version(version: &str) {
    // TODO: Unfinished implementation
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
    let data_dir = get_data_dir(false).expect("Failed to get data dir");

    let zip_path = data_dir.0.join("Peacock.zip");

    spawn(async move {
        unzip_to_directory(&zip_path, &data_dir.0);
    });
}

#[tauri::command]
pub async fn launch_version(window: Window<Wry>, state: AppState) {
    // TODO: Unfinished implementation

    let (data_dir, _) = get_data_dir(false).expect("Failed to get data dir");
    let chunk0_path = data_dir.join(format!("Peacock-{0}/chunk0.js", state.config.active_version));

    let mut environment = HashMap::new();

    environment.insert("NODE_ENV".to_string(), "production".to_string());
    environment.insert("FORCE_COLOR".to_string(), "true".to_string());
    environment.insert("IS_PEACOCK_LAUNCHER".to_string(), "true".to_string());
    environment.insert("SUPPORTS_COLOR".to_string(), "true".to_string());

    let (mut rx, _) = Command::new(String::from("node"))
        .envs(environment)
        .current_dir(data_dir.join("workspace"))
        .args(&[chunk0_path.to_str().expect("chunk0 path should be valid str.")])
        .spawn()
        .expect("Failed to execute command");

    tauri::async_runtime::spawn(async move {
        while let Some(event) = rx.recv().await {
            match event {
                CommandEvent::Stdout(line) => {
                    println!("stdout: {}", line);
                    window
                        .emit("log_message", line)
                        .expect("Failed to emit output");
                }
                CommandEvent::Terminated(_) => return,
                CommandEvent::Stderr(line) => {
                    eprintln!("stderr: {}", line);
                    window
                        .emit("log_message", line)
                        .expect("Failed to emit output");
                }
                CommandEvent::Error(err) => {
                    eprintln!("error: {}", err);
                    window
                        .emit("log_message", err)
                        .expect("Failed to emit output");
                }
                _ => {}
            }
        }
    });
}
