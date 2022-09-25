#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod file_utils;
mod structs;

use std::cmp::min;
use std::fs::File;
use std::io::Write;

use futures_util::StreamExt;
use reqwest::Client;
use tauri::async_runtime::block_on;
use tauri::Manager;
use crate::structs::{AppState};

#[tauri::command]
fn download_version(version: &str) {
    println!("Downloading version {}", version);

    let client = Client::new();
    let task = download_file(&client, "https://google.com", "test.txt");

    block_on(task).expect("Failed to download file!");
}

#[tauri::command]
fn is_first_time(state: tauri::State<AppState>) -> bool {
    state.is_first_time
}

fn main() {
    let config = file_utils::load_config().expect("Failed to load config");

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
        .invoke_handler(tauri::generate_handler![is_first_time, download_version])
        .run(tauri::generate_context!())
        .expect("Error while running Peacock Launcher");
}

pub async fn download_file(client: &Client, url: &str, path: &str) -> Result<(), String> {
    let res = client
        .get(url)
        .send()
        .await
        .or(Err(format!("Failed to GET from '{}'", &url)))?;

    let total_size = res.content_length();

    if total_size.is_none() {
        return Err(format!("Failed to get content length from '{}'", &url));
    }

    let total_size_u64 = total_size.unwrap();

    // download chunks
    let mut file = File::create(path).or(Err(format!("Failed to create file '{}'", path)))?;
    let mut downloaded: u64 = 0;
    let mut stream = res.bytes_stream();

    while let Some(item) = stream.next().await {
        let chunk = item.or(Err(format!("Error while downloading file")))?;
        file.write_all(&chunk)
            .or(Err(format!("Error while writing to file")))?;
        let new = min(downloaded + (chunk.len() as u64), total_size_u64);
        downloaded = new;
        println!("Downloaded {} of {}", new, total_size_u64);
    }

    return Ok(());
}
