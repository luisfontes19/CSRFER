import yargs from "yargs";

const menu = yargs
  .usage('\n\nUsage: $0 [options]')
  .alias('r', 'request')
  .nargs('r', 1)
  .describe('r', 'Path to the request file to be used')

  .alias('m', 'mode')
  .nargs('m', 1)
  .describe('m', 'Mode to generate the code. Available options: form, fetch. (Default is form)')

  .alias('a', 'autosubmit')
  .describe('a', 'Auto submit the request on page load')

  .alias('s', 'show')
  .describe('s', 'Show the form inputs (only for form mode)')

  .alias('o', 'output')
  .nargs('o', 1)
  .describe('o', 'Output the payload to the specified file instead of STDOUT')

  .alias('t', 'template')
  .nargs('t', 1)
  .describe('t', 'Path to an html template page. Use the placeholder {{CONTENT}} to specify where to inject the code (in html, not JS)')

  .alias('T', 'defaulttemplate')
  .describe('T', 'Use this option if you want the code to be injected into a default html page.')

  .demandOption(['r'])

  .help('h')
  .alias('h', 'help')

  .example('$0 -r req.txt -m form -a', 'Automatically submit a form request')
  .example('$0 -r req.txt -m form -s', 'Generate and shows a form to be submitted manually')
  .example('$0 -r req.txt -m fetch -t my_template.html', 'Generates a fetch request and uses the supplied template page')
  .epilog("")

  .wrap(process.stdout.columns);


export default menu;


export const header =

  "          -.--.\n" +
  "          )  \" '-,\n" +
  "          ',' 2  \\_\n" +
  "           \\q \\ .  \\\n" +
  "        _.--'  '----.__\n" +
  "       /  ._      _.__ \\__\n" +
  "    _.'_.'  \\_ .-._\\_ '-, }\n" +
  "   (,/ _.---;-(  . \\ \\   ~\n" +
  " ____ (  .___\\_\\  \\/_/\n" +
  "(      '-._ \\   \\ |\n" +
  " '._       ),> _) >\n" +
  "    '-._ c='  Cooo  -._\n" +
  "        '-._           '.\n" +
  "            '-._         `\\\n" +
  "       snd      '-._       '.\n" +
  "                    '-._     \\\n" +
  "                        `~---'\n" +
  "\n" +
  " _____  _________________ ___________ \n" +
  "/  __ \\/  ___| ___ \\  ___|  ___| ___ \\\n" +
  "| /  \\/\\ `--.| |_/ / |_  | |__ | |_/ /\n" +
  "| |     `--. \\    /|  _| |  __||    / \n" +
  "| \\__/\\/\\__/ / |\\ \\| |   | |___| |\\ \\ \n" +
  " \\____/\\____/\\_| \\_\\_|   \\____/\\_| \\_|\n" +
  "                                      \n" +
  "                                      \n" +
  "       CSRFER by Luis Fontes";


