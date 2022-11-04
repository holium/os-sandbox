# Holium - OS Sandbox

This is a limited version of Holium's OS environment for app developers to integrate with.

## Structure

There are three top-level folders in this repo.

- `ui`
- `desk`
- `sandbox`

Two of them (`ui`, `desk`) should be similar to the [`create-landscape-app`](https://github.com/urbit/create-landscape-app) project. The third, `sandbox` is the desktop environment emulator.

## Getting started

If you are starting from scratch, it may be useful to fork or copy this repo and begin building from here. If you already have a project, you can use the `.env` file in the `/sandbox` folder to connect to your locally running app.

Check out [`DEV_SETUP.md`](/DEV_SETUP.md) to get a fake ship running.

## Theming

Realm passes in these CSS variables which you can then leverage in whatever way you need.

- `--rlm-base-color`: all other system colors are generated from this base color.
- `--rlm-font`
- `--rlm-accent-color`
- `--rlm-input-color`
- `--rlm-border-color`
- `--rlm-window-color`
- `--rlm-card-color`
- `--rlm-theme-mode`
- `--rlm-text-color`
- `--rlm-icon-color`

### How to use

#### CSS variable injection

```css
body {
  /* #FFFFF will be used if the app is not opened in Realm, i.e. Landscape */
  background-color: var(--rlm-window-color, #FFFFF);
}
```

#### scry %spaces

Scry the following: `/spaces/<space-path>.json`

Reponse:
```json
{
    "space": {
        "name": "~dev",
        "theme": {
            "windowColor": "#fff",
            "accentColor": "#4E9EFD",
            "inputColor": "#fff",
            "backgroundColor": "#C4C3BF",
            "dockColor": "#fff",
            "mode": "light",
            "iconColor": "rgba(95,94,88,0.3)",
            "wallpaper": "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=100",
            "textColor": "#333333"
        },
        "picture": "",
        "path": "/~dev/our",
        "type": "our",
        "updatedAt": 1664811378253,
        "color": "#000000"
    }
}

```


### Examples

Engram implemented Realm theming using `os-sandbox`

<img width="779" alt="image" src="https://user-images.githubusercontent.com/6413077/199961305-ab167991-4271-4f5b-a698-96b2ef085ef2.png">
<img width="779" alt="image" src="https://user-images.githubusercontent.com/6413077/199961359-5331fba1-2307-48d3-9470-a566ab6702ae.png">

### Future theming

We plan to expand how customizable the system is, such as border-radius, window adornments, etc.


