use tokio::io::{AsyncBufReadExt, BufReader};
use tokio::process::Command;

use std::process::Stdio;

// TODO: use this
#[allow(dead_code)]
pub async fn run_process(
    process: &str,
    args: &Vec<&str>,
    output_handler: &dyn Fn(&str),
) -> Result<(), Box<dyn std::error::Error>> {
    let mut cmd = Command::new(process);
    cmd.args(args);

    cmd.stdout(Stdio::piped());

    let mut child = cmd.spawn().expect("Failed to spawn command");

    let stdout = child
        .stdout
        .take()
        .expect("Child did not have a handle to stdout");

    let mut reader = BufReader::new(stdout).lines();

    tokio::spawn(async move {});

    while let Some(line) = reader.next_line().await? {
        output_handler(&*line);
    }

    Ok(())
}
