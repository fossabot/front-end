import { compile } from 'path-to-regexp';

export default function getUrl(path, data = {}) {
  compile(path)(data);
}
