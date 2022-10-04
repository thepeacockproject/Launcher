use crate::structs::AppConfig;
use std::path::{Path, PathBuf};
use zip::ZipArchive;

static SUB_DIRS: [&str; 3] = ["versions", "plugins", "workspace"];

/// Makes sure a directory exists, and creates it if it doesn't.
/// Returns true if it already existed, false if not.
fn ensure_dir(dir: &PathBuf) -> bool {
    if dir.exists() {
        return true;
    }

    std::fs::create_dir_all(dir)
        .unwrap_or_else(|_| panic!("Failed to create directory {}", dir.to_str().unwrap()));
    false
}

/// Get the path to the persistent data directory
pub fn get_data_dir(output_data_dir: bool) -> Result<(PathBuf, bool), String> {
    let data_dir = tauri::api::path::data_dir()
        .or_else(|| Some("Failed to get data dir".to_string().parse().unwrap()));

    let data_dir = data_dir.expect("should have data dir").join("peacock");

    // make sure it exists
    let exists = ensure_dir(&data_dir);

    if output_data_dir {
        println!("Data dir: {}", data_dir.to_str().unwrap());
    }

    Ok((data_dir, exists))
}

/// Ensure that the required directory structure exists
pub fn ensure_directory_structure() {
    let (data_dir, _) = get_data_dir(false).expect("Failed to get data dir");

    for dir in SUB_DIRS.iter() {
        let dir = data_dir.join(dir);
        ensure_dir(&dir);
    }
}

/// Load the configuration file from the persistent data directory
pub fn load_config() -> Result<(AppConfig, bool), String> {
    let data_dir = get_data_dir(true)?;
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
    let config_file = std::fs::File::open(&config_path).map_err(|_| {
        format!(
            "Failed to open config file at '{}'",
            config_path.to_str().unwrap()
        )
    })?;
    let config: AppConfig =
        serde_json::from_reader(config_file).or(Err("Failed to parse config file!"))?;

    Ok((config, false))
}

/// Save the configuration file to the persistent data directory
pub fn save_config(config: &AppConfig) -> Result<(), String> {
    let data_dir = get_data_dir(false)?;
    let config_path = data_dir.0.join("config.json");

    // write the config file
    let config_file = std::fs::File::create(&config_path).map_err(|_| {
        format!(
            "Failed to create config file at '{}'",
            config_path.to_str().unwrap()
        )
    })?;
    serde_json::to_writer_pretty(config_file, config).map_err(|_| {
        format!(
            "Failed to write config file at '{}'",
            config_path.to_str().unwrap()
        )
    })?;

    Ok(())
}

/// Unzip a file to a directory
pub fn unzip_to_directory(zip_path: &PathBuf, out_dir: &Path) {
    let file = std::fs::File::open(zip_path)
        .map_err(|_| {
            format!(
                "Failed to open zip file at '{}'",
                zip_path.to_str().unwrap()
            )
        })
        .expect("Failed to open zip file");

    let mut archive = ZipArchive::new(file)
        .map_err(|_| {
            format!(
                "Failed to open zip archive at '{}'",
                zip_path.to_str().unwrap()
            )
        })
        .expect("Failed to open zip archive");

    #[cfg(dev)]
    println!("File count in archive: {}", archive.len());

    for i in 0..archive.len() {
        let mut file = archive
            .by_index(i)
            .map_err(|_| {
                format!(
                    "Failed to get zip file at index {} in '{}'",
                    i,
                    zip_path.to_str().unwrap()
                )
            })
            .expect("Should have file.");

        let out_path = out_dir.join(file.mangled_name());

        if file.name().ends_with('/') {
            ensure_dir(&out_path);
            println!("Dir created: \"{}\"", out_path.as_path().display());
            continue;
        }

        // this is clearly a file, write it out
        std::fs::File::create(&out_path)
            .map_err(|_| format!("Failed to create file at '{}'", out_path.to_str().unwrap()))
            .expect("Should be able to create file.");

        let mut outfile = std::fs::OpenOptions::new()
            .write(true)
            .truncate(true)
            .open(&out_path)
            .map_err(|_| format!("Failed to open file at '{}'", out_path.to_str().unwrap()))
            .expect("Should be able to open file.");

        std::io::copy(&mut file, &mut outfile).expect("File should have been properly copied.");

        println!(
            "Extracted: \"{}\" ({} bytes)",
            out_path.as_path().display(),
            file.size(),
        );
    }

    #[cfg(dev)]
    println!("Done extracting.");
}
