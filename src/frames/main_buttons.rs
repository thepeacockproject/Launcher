use egui::Ui;

pub fn ui_main_buttons(ctx: &egui::Context, ui: &mut Ui) {
    let mut value = 0.0;
    let mut label = String::new();

    ui.horizontal_top(|ui| {
        ui.button("Menu")
            .on_hover_text("This is a tooltip")
            .on_hover_ui(|ui| {
                ui.label("This is a popup");
                ui.label("with multiple lines");
            });
        ui.button("Start Peacock")
            .on_hover_text("This is a tooltip")
            .on_hover_ui(|ui| {
                ui.label("This is a popup");
                ui.label("with multiple lines");
            });
        ui.button("Update")
            .on_hover_text("This is a tooltip")
            .on_hover_ui(|ui| {
                ui.label("This is a popup");
                ui.label("with multiple lines");
            });
    });
}
