## Getting started

### Fake ships and Urbit

```zsh
# Make ships folder
mkdir ships
cd ships
# Download latest urbit
curl -JLO https://urbit.org/install/mac/latest
# Uncompress
tar zxvf ./darwin.tgz --strip=1
```

Now you should have the urbit files in the `ships` folder. This folder is ignored by GIT.

#### Download latest urbit repo

```zsh
git clone https://github.com/urbit/urbit
```

This will add a `urbit` folder to your local repo which is ignored by git.

#### Booting a fake ship for development

```zsh
# The -F will create a fake zod
./urbit -F zod -B ../urbit/bin/multi-brass.pill

# Optional:
#   Fake bus for networking between fake ships
./urbit -F bus -B ../urbit/bin/multi-brass.pill
```

This will start booting a comet and may take a while.

[See more docs for working with the developer environment.](https://urbit.org/docs/development/environment)

#### Symbolic linking base-dev and garden-dev

Now, you can symbolic link the urbit dev desks `base-dev` and `garden-dev`.

```zsh
cd urbit/pkg
mkdir your-app
./symbolic-merge.sh base-dev your-app
./symbolic-merge.sh garden-dev your-app
```

Now, you want to start your dev ship `zod`.

```zsh
./urbit zod
```

Once started, you should run the following commands on your ship.

```hoon
> |merge %your-app our %base
>=
> |mount %your-app
>=
```

Then we want to delete the contents of the mounted folder now in `ships/zod/your-app`.

```zsh
cd ships/zod
sudo rm -r your-app/*
```

And finally, we will copy the symlinked folder from our `urbit/pkg` folder from `ships/zod`.

```zsh
# make sure you are in ships/zod
cp -RL ../../urbit/pkg/your-app/* your-app
```

### Copying the dev desk to a fake ship.

There is a script called `./copy-desk.sh` that takes a ship name and app name.

```zsh
# Only have to run the first time
chmod +x ./copy-desk.sh
# this will copy the desk
./copy-desk.sh zod your-app
```

This is how we can update and write new code from a dev folder. To have the updates take effect in our ship, run:

```hoon
|commit %your-app
```

#### Installing %your-app

```hoon
|install our %your-app
```

#### Starting/Running %your-app

```hoon
|rein %your-app [& %your-app]
```

#### Allow origin (CORS)

For `~zod`:

```hoon
~zod:dojo> |pass [%e [%approve-origin 'http://localhost:3000']]
```
