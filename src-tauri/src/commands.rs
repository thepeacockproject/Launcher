use crate::file_utils::{get_data_dir, unzip_to_directory};
use crate::http_utils::download_file;
use crate::AppState;
use reqwest::Client;
use task::spawn;
use tauri::api::process::{Command, CommandEvent};
use tauri::async_runtime::block_on;
use tauri::{State, Window, Wry};
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
    let data_dir = get_data_dir(false).expect("Failed to get data dir");

    let zip_path = data_dir.0.join("Peacock.zip");

    spawn(async move {
        unzip_to_directory(&zip_path, &data_dir.0);
    });
}

#[tauri::command]
pub async fn launch_test(window: Window<Wry>) {
    let (data_dir, _) = get_data_dir(false).expect("Failed to get data dir");
    let exe_path = data_dir.join("Peacock-v5.2.1/main.sh");

    let (mut rx, _) = Command::new(String::from(
        exe_path.to_str().expect("EXE path should be valid str."),
    ))
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
                _ => {}
            }
        }
    });
}
