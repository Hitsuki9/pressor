# Pressor

Pressor is a tool to compress images to target size via canvas in browser

## Installing

```sh
npm install pressor
// or
yarn add pressor
// or
pnpm add pressor
```

## Usage

**compress:**

The function signature of `compress` is:

```ts
function compress(file: File, limit: number, accuracy: number): Promise<File>;
```

- `file`: the image file which will be compressed
- `limit`: the target size of the compressed file in kb, default to `500`
- `accuracy`: the accuracy of produced file size, default to `0.8`

example:

```ts
import { compress } from 'pressor';

const inputChangeHandler = async (evt) => {
  const file = evt.target.files[0];
  const result = await compress(file);
};
```
