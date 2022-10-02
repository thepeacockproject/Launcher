use reqwest::Client;
use std::cmp::min;
use std::fs::File;
use std::io::Write;

use futures_util::StreamExt;

pub async fn download_file(client: &Client, url: &str, path: &str) -> Result<(), String> {
    let res = client
        .get(url)
        .send()
        .await
        .map_err(|_| format!("Failed to GET from '{}'", &url))?;

    let total_size = res.content_length();

    if total_size.is_none() {
        return Err(format!("Failed to get content length from '{}'", &url));
    }

    let total_size_u64 = total_size.unwrap();

    // download chunks
    let mut file = File::create(path).map_err(|_| format!("Failed to create file '{}'", path))?;
    let mut downloaded: u64 = 0;
    let mut stream = res.bytes_stream();

    while let Some(item) = stream.next().await {
        let chunk = item.map_err(|_| "Error while downloading file".to_string())?;
        file.write_all(&chunk)
            .map_err(|_| "Error while writing to file".to_string())?;
        let new = min(downloaded + (chunk.len() as u64), total_size_u64);
        downloaded = new;
        println!("Downloaded {} of {}", new, total_size_u64);
    }

    Ok(())
}
