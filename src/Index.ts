import { App } from './App';

async function main() {
    const app = new App(3000);
    await app.listen();
}

main();