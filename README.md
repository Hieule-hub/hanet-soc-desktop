# Hanet desktop

Phần mềm điều khiển trung tâm. Gồm 2 thành phần:
- Web frontend: dựa trên React
- Web backend: dựa trên Rust
- Đóng gói: sử dụng [Tauri toolkit](https://tauri.app)

## Setup dependencies
```bash
npm install
```

## Start project - development mode
```bash
npm run tauri dev
```
- Locate web project at url: http://localhost:1420

## Build & run
```bash
npm run build
```
- $MODE: debug|release
- Locate build binary at path: $PROJECT_FOLDER_PATH/src-tauri/target/$MODE/hanet-desktop.exe
