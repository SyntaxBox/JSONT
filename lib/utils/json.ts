export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;

export interface JSONObject {
  [key: string]: JSONValue;
}

export interface JSONArray extends Array<JSONValue> {}

export function extractStringsFromJSON(json: JSONObject) {
  const strings: string[] = [];
  const paths: string[] = [];

  function traverse(obj: JSONValue, path: string = ""): void {
    if (typeof obj === "string") {
      strings.push(obj);
      paths.push(path);
    } else if (Array.isArray(obj)) {
      obj.forEach((item, index) => traverse(item, `${path}[${index}]`));
    } else if (typeof obj === "object" && obj !== null) {
      Object.entries(obj).forEach(([key, value]) =>
        traverse(value, path ? `${path}.${key}` : key),
      );
    }
  }

  traverse(json);
  return { strings, paths } as const;
}

export function mapStringsToJSON(
  json: JSONObject,
  strings: string[],
  paths: string[],
): JSONObject {
  function set(obj: JSONObject | JSONArray, path: string, value: string): void {
    const parts = path.split(".").filter(Boolean);
    let current: JSONValue = obj;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      if (part.includes("[")) {
        const [key, indexStr] = part.split(/[\[\]]/);
        const index = parseInt(indexStr, 10);

        if (isLast) {
          // @ts-ignore BUG: FIX TS ISSUE HERE!
          (current as JSONObject)[key][index] = value;
        } else {
          // @ts-ignore BUG: FIX TS ISSUE HERE!
          current = (current as JSONObject)[key][index];
        }
      } else {
        if (isLast) {
          (current as JSONObject)[part] = value;
        } else {
          current = (current as JSONObject)[part];
        }
      }
    }
  }

  const jsonCopy: JSONObject = JSON.parse(JSON.stringify(json));
  paths.forEach((path, index) => {
    set(jsonCopy, path, strings[index]);
  });

  return jsonCopy;
}
