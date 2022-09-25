use crate::structs::AppConfig;
use std::path::PathBuf;

/// Get the path to the persistent data directory
fn get_data_dir() -> Result<(PathBuf, bool), String> {
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
    let config: AppConfig = serde_json::from_reader(config_file).or(Err(
        "Failed to parse config file!",
    ))?;

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
