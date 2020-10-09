import { HTTPParser } from "./HTTPParser";
import { Generator, GeneratorData, MODE } from "./Generator";
import menu, { header } from "./Menu";
import * as fs from 'fs';


console.log(header);

const args = menu.argv;
const reqFile = args.r as string;
const reqContent = fs.readFileSync(reqFile).toString();
const parsedRequest = HTTPParser.fromString(reqContent);

const t = args.t as string;
const template = t ? fs.readFileSync(t).toString() : undefined;

if (parsedRequest) {
  const params: GeneratorData = {
    url: parsedRequest.url,
    method: parsedRequest.method,
    headers: parsedRequest.headers,
    body: parsedRequest.body,

    autoSubmit: args.a as boolean,
    mode: (args.m as string || "").toLowerCase() === "fetch" ? MODE.FETCH : MODE.FORM,
    template: template,
    useTemplate: args.T as boolean,
    visible: args.s as boolean,

    className: args.c as string
  };

  const htmlPayload = Generator.generate(params);

  const output = args.o as string;
  if (output) {
    fs.writeFileSync(output, htmlPayload);
    console.log("Wrote payload file to " + output);
  }
  else
    console.log(htmlPayload);
}
