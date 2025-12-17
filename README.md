# NOVA Next.js app template 

This boilerplate can be generated with the [NOVA CLI](https://portal.wandelbots.io/en/download) and running `nova app create myapp`.

The generated boilerplate is a [NextJS](https://nextjs.org/) app which gives the user the skeleton to start a new robot application.

⚡ Next.js with App Router support

🔥 Type checking TypeScript

📏 Linting & Formatting with Biome

## Development setup

First install [pnpm](https://pnpm.io/), which is used to manage the node version as well as the packages. 

## Installing dependencies

```bash
pnpm install
```

## Connecting to an existing instance

You can tell the boilerplate project to connect to the instance by providing the `WANDELAPI_BASE_URL`, `CELL_ID`, `NOVA_USERNAME` and `NOVA_PASSWORD` environment variables. For example, if your instance is at `my.instance.wandelbots.io` and your cell is called `cell`.
Remember to replace the IP address with the one of your [Cloud-Instance](https://portal.wandelbots.io/de/instances).

```bash
WANDELAPI_BASE_URL=http://my.instance.wandelbots.io
CELL_ID=cell
NOVA_USERNAME="wb"
NOVA_PASSWORD="password"
```

## Running the dev server

Once everything is set up, you can run the NextJS dev server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture notes

The boilerplate is structurally pretty simple since it needs no url changes, like a basic React SPA. Some things to note:

- The application relies on the NPM package `@wandelbots/nova-js` and `@wandelbots/wandelbots-js-react-components`. The package is used to communicate with the Wandelbots API. The component library is used to render specific components like the robot.
- Selected environment variables from the runtime server context are injected into the browser by SSR of the layout, see `runtimeEnv.ts`. This allows the docker image to be configurable on startup without rebuilding Next
- We use a lot of [MobX](https://mobx.js.org/the-gist-of-mobx.html) observables and computed properties for state management
