use crate::structs::AppConfig;
use std::path::PathBuf;
use zip::ZipArchive;

/// Get the path to the persistent data directory
pub fn get_data_dir() -> Result<(PathBuf, bool), String> {
    let data_dir = tauri::api::path::data_dir()
        .or(Some("Failed to get data dir".to_string().parse().unwrap()));

    let data_dir = data_dir.expect("should have data dir").join("peacock");

    // does it exist
    let exists = data_dir.exists();

    // create the directory if it doesn't exist
    std::fs::create_dir_all(&data_dir).or(Err(format!(
        "Failed to create data dir at '{}'",
        data_dir.to_str().unwrap()
    )))?;

    println!("Data dir: {}", data_dir.to_str().unwrap());

    Ok((data_dir, exists))
}

/// Load the configuration file from the persistent data directory
pub fn load_config() -> Result<(AppConfig, bool), String> {
    let data_dir = get_data_dir()?;
    let config_path = data_dir.0.join("config.json");

    // if the config file doesn't exist, create it
    if !config_path.exists() {
        let config = AppConfig {
            installed_versions: vec![],
        };
        save_config(&config)?;
        return Ok((config, true));
    }

    // read the config file
    let config_file = std::fs::File::open(&config_path).or(Err(format!(
        "Failed to open config file at '{}'",
        config_path.to_str().unwrap()
    )))?;
    let config: AppConfig =
        serde_json::from_reader(config_file).or(Err("Failed to parse config file!"))?;

    Ok((config, false))
}

/// Save the configuration file to the persistent data directory
pub fn save_config(config: &AppConfig) -> Result<(), String> {
    let data_dir = get_data_dir()?;
    let config_path = data_dir.0.join("config.json");

    // write the config file
    let config_file = std::fs::File::create(&config_path).or(Err(format!(
        "Failed to create config file at '{}'",
        config_path.to_str().unwrap()
    )))?;
    serde_json::to_writer_pretty(config_file, config).or(Err(format!(
        "Failed to write config file at '{}'",
        config_path.to_str().unwrap()
    )))?;

    Ok(())
}

/// Unzip a file to a directory
pub fn unzip_to_directory(zip_path: &PathBuf, out_dir: &PathBuf) {
    let file = std::fs::File::open(zip_path)
        .or(Err(format!(
            "Failed to open zip file at '{}'",
            zip_path.to_str().unwrap()
        )))
        .expect("Failed to open zip file");

    let mut archive = ZipArchive::new(file)
        .or(Err(format!(
            "Failed to open zip archive at '{}'",
            zip_path.to_str().unwrap()
        )))
        .expect("Failed to open zip archive");

    #[cfg(dev)]
    println!("File count in archive: {}", archive.len());

    for i in 0..archive.len() {
        let mut file = archive
            .by_index(i)
            .or(Err(format!(
                "Failed to get zip file at index {} in '{}'",
                i,
                zip_path.to_str().unwrap()
            )))
            .expect("Should have file.");

        let out_path = out_dir.join(file.mangled_name());

        if (&*file.name()).ends_with("/") {
            println!(
                "Dir created: \"{}\"",
                out_path.as_path().display()
            );
            std::fs::create_dir_all(&out_path)
                .or(Err(format!(
                    "Failed to create directory at '{}'",
                    out_path.to_str().unwrap()
                )))
                .expect("Should be able to create directory.");
            continue;
        }

        // this is clearly a file, write it out
        std::fs::File::create(&out_path)
            .or(Err(format!(
                "Failed to create file at '{}'",
                out_path.to_str().unwrap()
            )))
            .expect("Should be able to create file.");

        let mut outfile = std::fs::OpenOptions::new()
            .write(true)
            .truncate(true)
            .open(&out_path)
            .or(Err(format!(
                "Failed to open file at '{}'",
                out_path.to_str().unwrap()
            )))
            .expect("Should be able to open file.");

        std::io::copy(&mut file, &mut outfile).expect("File should have been properly copied.");

        println!(
            "Extracted: \"{}\" ({} bytes)",
            out_path.as_path().display(),
            file.size(),
        );
    }

    println!("Done extracting.");
}
