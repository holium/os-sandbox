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

```css
body {
  /* #FFFFF will be used if the app is not opened in Realm, i.e. Landscape */
  background-color: var(--rlm-window-color, #FFFFF);
}
```

### Examples

Engram implemented Realm theming using `os-sandbox`

<img width="779" alt="image" src="https://user-images.githubusercontent.com/6413077/199961305-ab167991-4271-4f5b-a698-96b2ef085ef2.png">
<img width="779" alt="image" src="https://user-images.githubusercontent.com/6413077/199961359-5331fba1-2307-48d3-9470-a566ab6702ae.png">

### Future theming

We plan to expand how customizable the system is, such as border-radius, window adornments, etc.


